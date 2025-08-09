import {followUser, requestUsers, unfollowUser} from "../../redux/usersReducer";
import React, {useCallback, useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const UserContainerFC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const isFetching = useAppSelector(getIsFetching)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, []);

    const onPageChanged = useCallback((page: number) => {
        dispatch(requestUsers(page, pageSize));
    }, [currentPage])

    const onFollowButtonClick = (id: number) => {
        dispatch(followUser(id));
    }

    const onUnfollowButtonClick = (id: number) => {
        dispatch(unfollowUser(id));
    }

    return (
        <>
            {isFetching
                ? <Preloader/>
                : <Users followingInProgress={followingInProgress}
                         users={users}
                         onFollowButtonClick={onFollowButtonClick}
                         onUnfollowButtonClick={onUnfollowButtonClick}
                         onPageChanged={onPageChanged}
                         currentPage={currentPage}
                         totalUsersCount={totalUsersCount}
                         pageSize={pageSize}
                />
            }
        </>
    )
}

export default UserContainerFC;