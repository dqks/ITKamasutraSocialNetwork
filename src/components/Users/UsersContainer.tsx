import {followUserThunk, requestUsers, unfollowUserThunk} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getSearchUserFilter,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface UserContainerProps {
}

const UserContainerFC = ({}: UserContainerProps) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const isFetching = useAppSelector(getIsFetching)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const searchUserFilter = useAppSelector(getSearchUserFilter)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, searchUserFilter))
    }, [currentPage, pageSize, searchUserFilter]);

    const onFollowButtonClick = (id: number) => {
        dispatch(followUserThunk(id));
    }

    const onUnfollowButtonClick = (id: number) => {
        dispatch(unfollowUserThunk(id));
    }

    return (
        <>
            {isFetching
                ? <Preloader/>
                : <Users followingInProgress={followingInProgress}
                    users={users}
                    onFollowButtonClick={onFollowButtonClick}
                    onUnfollowButtonClick={onUnfollowButtonClick}
                    // onPageChanged={onPageChanged}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                />
            }
        </>
    )
}

export default UserContainerFC;