import {useSearchParams} from "react-router-dom";
import {setFriendFilter, setUserNameFilter} from "../redux/usersReducer";
import {useAppDispatch} from "./redux";

type QueryFunc = (isSimpleRequest: boolean,
    currentPage: number,
    term?: string | null,
    friend?: boolean | null,
    shouldDispatch?: boolean) => void;

type QueryFilterParams = () => [
    QueryFunc,
    searchParams: URLSearchParams
]

export const useQueryFilter: QueryFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    const setSearchFilter: QueryFunc = (isSimpleRequest,
        currentPage,
        term = '',
        friend = null,
        shouldDispatch?) => {
        if (isSimpleRequest) {
            setSearchParams(`?currentPage=${currentPage}`)
        } else {
            setSearchParams(`?currentPage=${currentPage}&term=${term}&friend=${friend}`)
        }
        if (shouldDispatch && term !== null && friend !== undefined) {
            dispatch(setUserNameFilter(term))
            dispatch(setFriendFilter(friend))
        }
    }

    return [setSearchFilter, searchParams]
}