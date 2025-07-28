import classes from "./Paginator.module.css";
import React from "react";

const Paginator = ({onPageChanged, totalUsersCount, pageSize, currentPage}) => {
    // let pagesCount =  Math.ceil(totalUsersCount / pageSize);
    let pages = []
    for (let i = 1; i <= 9; i++) {
        pages.push(i);
    }
    return (
        <div>
            {
                pages.map(page =>
                    <span key={page} onClick={() => onPageChanged(page)}
                          className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)
            }
        </div>
    )
}

export default Paginator;