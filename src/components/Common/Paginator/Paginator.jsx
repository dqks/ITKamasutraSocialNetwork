import classes from "./Paginator.module.css";
import React from "react";

const Paginator = ({onPageChanged, totalUsersCount, pageSize, currentPage, firstCurrentPage, lastCurrentPage, onNextPageButtonClick, onPreviousPageButtonClick}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    // pagesCount = 9;
    //5509
    let pages = []
    console.log(firstCurrentPage)
    console.log(lastCurrentPage)
    for (let i = firstCurrentPage; i <= lastCurrentPage; i++) {
        pages.push(i);
    }
    return (
        <div>
            <button onClick={() => onPreviousPageButtonClick()}  className={classes.arrow}>&larr;</button>
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