import classes from "./Paginator.module.css";
import React, {useEffect, useState} from "react";

const Paginator = ({
                       onPageChanged,
                       totalUsersCount,
                       pageSize,
                       currentPage,
                       portionSize
                   }) => {
    useEffect(() => {
        setCurrentPortion(Math.ceil(currentPage / portionSize))
    }, [currentPage]);

    let totalPageAmount = Math.ceil(totalUsersCount / pageSize);

    let portionCount = Math.ceil(totalPageAmount / portionSize);

    let [currentPortion, setCurrentPortion] = useState(1);
    let currentLeftBorder = (currentPortion - 1) * portionSize + 1;
    let currentRightBorder = currentPortion * portionSize;

    const onPreviousPageButtonClick = () => {
        if (currentPortion - 1 < 1) {
            return;
        }
        setCurrentPortion(currentPortion - 1);
    }

    const onNextPageButtonClick = () => {
        if (currentPortion === portionCount) {
            return;
        }
        setCurrentPortion(currentPortion + 1);
    }

    let pages = []
    for (let i = currentLeftBorder; i <= currentRightBorder; i++) {
        pages.push(i);
    }

    return (
        <div>
            <button onClick={onPreviousPageButtonClick} className={classes.arrow}>&larr;</button>
            {pages
                .filter((page) => page <= totalPageAmount)
                .map(page => <span key={page} onClick={() => onPageChanged(page)}
                                     className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)}
            <button onClick={onNextPageButtonClick} className={classes.arrow}>&rarr;</button>
        </div>
    )
}

export default Paginator;