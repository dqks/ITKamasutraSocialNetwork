import {useSearchParams} from "react-router-dom";

type QueryFunc = (currentPage: number,
    term?: string | null,
    friend?: boolean | null) => void;

type QueryFilterParams = () => [
    QueryFunc,
    searchParams: URLSearchParams
]

export const useQueryFilter: QueryFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const setSearchFilter: QueryFunc = (currentPage,
        term = '',
        friend = null) => {
        let queryResult = `?currentPage=${currentPage}`
        if (term !== '') {
            queryResult += `&term=${term}`
        }
        if (friend !== null) {
            queryResult += `&friend=${friend}`
        }
        setSearchParams(queryResult)
    }
    return [setSearchFilter, searchParams]
}