import classes from "./Paginator.module.css";
import React, {memo, useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface PaginatorProps {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    setCurrentPage: ActionCreatorWithPayload<number, "usersReducer/setCurrentPage">
}

const Paginator = ({
    totalUsersCount,
    pageSize,
    currentPage,
    portionSize,
    setCurrentPage
}: PaginatorProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCurrentPortion(Math.ceil(currentPage / portionSize))
    }, [currentPage]);

    let totalPageAmount = Math.ceil(totalUsersCount / pageSize);

    let portionCount = Math.ceil(totalPageAmount / portionSize);

    let [currentPortion, setCurrentPortion] = useState<number>(1);
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
            {currentPortion === 1
                ? null
                : <button onClick={onPreviousPageButtonClick} className={classes.arrow}>&larr;</button>}
            {pages
            .filter((page) => page <= totalPageAmount)
            .map(page => <span key={page}
                onClick={() => dispatch(setCurrentPage(page))}
                className={[currentPage === page && classes.selectedPage, classes.pageNumber].join(' ')}>{page}</span>)}
            {currentPortion === portionCount
                ? null
                : <button onClick={onNextPageButtonClick} className={classes.arrow}>&rarr;</button>}
        </div>
    )
}

export default memo(Paginator);