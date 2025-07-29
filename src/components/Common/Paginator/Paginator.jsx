import classes from "./Paginator.module.css";
import React, {useState} from "react";
import {useDispatch} from "react-redux";

const Paginator = ({
                       onPageChanged,
                       totalUsersCount,
                       pageSize,
                       currentPage,
                       firstCurrentPage,
                       lastCurrentPage,
                       pageIncrement,
                       storeFirstCurrentPage,
                       storeLastCurrentPage,
                   }) => {
    const dispatch = useDispatch();
    let totalPageAmount = Math.ceil(totalUsersCount / pageSize);
    //FCP - first current page
    //LCP - last current page
    let [memoizedFCP, setMemoizedFCP] = useState(firstCurrentPage)
    let [memoizedLCP, setMemoizedLCP] = useState(lastCurrentPage)

    const onPreviousPageButtonClick = () => {
        let resultFCP = firstCurrentPage - pageIncrement;
        let resultLCP = lastCurrentPage - pageIncrement;

        if (resultFCP < 1) resultFCP = 1;
        if (resultLCP < 9) resultLCP = 9;

        if (firstCurrentPage !== memoizedFCP && lastCurrentPage !== memoizedLCP) {
            dispatch(storeFirstCurrentPage(memoizedFCP))
            dispatch(storeLastCurrentPage(memoizedLCP))
            return;
        }
        setMemoizedFCP(resultFCP);
        setMemoizedLCP(resultLCP);
        dispatch(storeFirstCurrentPage(resultFCP))
        dispatch(storeLastCurrentPage(resultLCP))
    }

    const onNextPageButtonClick = () => {
        if (lastCurrentPage === totalPageAmount) {
            return;
        }

        let resultFCP = firstCurrentPage + pageIncrement;
        let resultLCP = lastCurrentPage + pageIncrement;

        if (resultLCP > totalPageAmount) {
            resultLCP = totalPageAmount;
            dispatch(storeFirstCurrentPage(resultFCP))
            dispatch(storeLastCurrentPage(resultLCP))
            return;
        }
        setMemoizedFCP(resultFCP);
        setMemoizedLCP(resultLCP);
        dispatch(storeFirstCurrentPage(resultFCP))
        dispatch(storeLastCurrentPage(resultLCP))
    }

    let pages = []
    for (let i = firstCurrentPage; i <= lastCurrentPage; i++) {
        pages.push(i);
    }

    return (
        <div>
            <button onClick={onPreviousPageButtonClick} className={classes.arrow}>&larr;</button>
            {pages.map(page => <span key={page} onClick={() => onPageChanged(page)}
                                     className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)}
            <button onClick={onNextPageButtonClick} className={classes.arrow}>&rarr;</button>
        </div>
    )
}

export default Paginator;