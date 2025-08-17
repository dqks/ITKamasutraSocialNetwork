import {useSearchParams} from "react-router-dom";
import {setFriendFilter, setUserNameFilter} from "../redux/usersReducer";
import {useAppDispatch} from "./redux";

type QueryFilterParams = () => [
    (currentPage: number,
        term?: string,
        friend?: boolean | null,
        shouldDispatch?: boolean) => void,
    (currentPage: number,
        term?: string,
        friend?: boolean | null,
        shouldDispatch?: boolean) => void,
    searchParams: URLSearchParams
]

export const useQueryFilter : QueryFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()


    const simplifiedQuery = (currentPage: number,
        term?: string,
        friend?: boolean | null,
        shouldDispatch?: boolean) => {
        setSearchParams(`?currentPage=${currentPage}`)
        if (shouldDispatch && term && friend) {
            dispatch(setUserNameFilter(term))
            dispatch(setFriendFilter(friend))
        }
    }

    const fullQuery = (currentPage: number,
        term?: string,
        friend?: boolean | null,
        shouldDispatch?: boolean) => {
        setSearchParams(`?currentPage=${currentPage}&term=${term}&friend=${friend}`)
        if (shouldDispatch && term && friend) {
            dispatch(setUserNameFilter(term))
            dispatch(setFriendFilter(friend))
        }
    }

    return [simplifiedQuery, fullQuery, searchParams]
}