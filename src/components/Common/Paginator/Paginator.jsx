import classes from "./Paginator.module.css";
import React, {useState} from "react";
import {useDispatch} from "react-redux";


const Paginator = ({
                       onPageChanged,
                       totalUsersCount,
                       pageSize,
                       currentPage,
                       baseFirstCurrentPage,
                       baseLastCurrentPage,
                       pageIncrement,
                       storeFirstCurrentPage,
                       storeLastCurrentPage,
                   }) => {
    const dispatch = useDispatch();
    let totalPageAmount = Math.ceil(totalUsersCount / pageSize);
    const [firstCurrentPage, setFirstCurrentPage] = useState(baseFirstCurrentPage);
    const [lastCurrentPage, setLastCurrentPage] = useState(baseLastCurrentPage);
    let [memoizedFirstCurrentPage,setMemoizedFirstCurrentPage ] = useState(baseFirstCurrentPage)
    let [memoizedLastCurrentPage, setMemoizedLastCurrentPage ] = useState(baseLastCurrentPage)

    const onPreviousPageButtonClick = () => {
        let resultFirstCurrentPage = firstCurrentPage - pageIncrement;
        let resultLastCurrentPage = lastCurrentPage - pageIncrement;

        if (resultFirstCurrentPage < 1)
            resultFirstCurrentPage = 1;
        if (resultLastCurrentPage < 9)
            resultLastCurrentPage = 9;

        debugger

        if (firstCurrentPage !== memoizedFirstCurrentPage && lastCurrentPage !== memoizedLastCurrentPage) {
            setFirstCurrentPage(memoizedFirstCurrentPage);
            setLastCurrentPage(memoizedLastCurrentPage);
            dispatch(storeFirstCurrentPage(memoizedFirstCurrentPage))
            dispatch(storeLastCurrentPage(memoizedLastCurrentPage))
            return;
        }

        setFirstCurrentPage(resultFirstCurrentPage);
        setLastCurrentPage(resultLastCurrentPage);
        setMemoizedFirstCurrentPage(resultFirstCurrentPage);
        setMemoizedLastCurrentPage(resultLastCurrentPage);
        dispatch(storeFirstCurrentPage(resultFirstCurrentPage))
        dispatch(storeLastCurrentPage(resultLastCurrentPage))
    }

    const onNextPageButtonClick = () => {
        if (lastCurrentPage === totalPageAmount) {
            return;
        }

        let resultFirstCurrentPage = firstCurrentPage + pageIncrement;
        let resultLastCurrentPage = lastCurrentPage + pageIncrement;

        if (resultLastCurrentPage > totalPageAmount) {
            resultLastCurrentPage = totalPageAmount;
            setFirstCurrentPage(resultFirstCurrentPage);
            setLastCurrentPage(resultLastCurrentPage);
            dispatch(storeFirstCurrentPage(resultFirstCurrentPage))
            dispatch(storeLastCurrentPage(resultLastCurrentPage))
            return;
        }

        setFirstCurrentPage(resultFirstCurrentPage);
        setLastCurrentPage(resultLastCurrentPage);
        setMemoizedFirstCurrentPage(resultFirstCurrentPage);
        setMemoizedLastCurrentPage(resultLastCurrentPage);
        dispatch(storeFirstCurrentPage(resultFirstCurrentPage))
        dispatch(storeLastCurrentPage(resultLastCurrentPage))
    }

    let pages = []
    for (let i = firstCurrentPage; i <= lastCurrentPage; i++) {
        pages.push(i);
    }

    return (
        <div>
            <button onClick={() => onPreviousPageButtonClick()} className={classes.arrow}>&larr;</button>
            {
                pages.map(page =>
                    <span key={page} onClick={() => onPageChanged(page)}
                          className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)
            }
            <button onClick={() => onNextPageButtonClick()} className={classes.arrow}>&rarr;</button>
        </div>
    )
}

export default Paginator;