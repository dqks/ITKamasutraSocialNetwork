import {useSearchParams} from "react-router-dom";

type QueryFunc = (isSimpleRequest: boolean,
    currentPage: number,
    term?: string | null,
    friend?: boolean | null) => void;

type QueryFilterParams = () => [
    QueryFunc,
    searchParams: URLSearchParams
]

export const useQueryFilter: QueryFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const setSearchFilter: QueryFunc = (isSimpleRequest,
        currentPage,
        term = '',
        friend = null) => {
        isSimpleRequest
            ? setSearchParams(`?currentPage=${currentPage}`)
            : setSearchParams(`?currentPage=${currentPage}&term=${term}&friend=${friend}`)
    }
    return [setSearchFilter, searchParams]
}