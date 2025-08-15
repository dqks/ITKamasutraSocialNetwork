import {followUserThunk, requestUsers, unfollowUserThunk} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress, getFriendFilter,
    getIsFetching, getNameFilter,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface UserContainerProps {
}

const UserContainer = ({}: UserContainerProps) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const currentPage = useAppSelector(getCurrentPage)
    const isFetching = useAppSelector(getIsFetching)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const nameFilter = useAppSelector(getNameFilter)
    const friendFilter = useAppSelector(getFriendFilter)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, nameFilter, friendFilter))
    }, [currentPage, pageSize, nameFilter, friendFilter]);

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
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                />
            }
        </>
    )
}

export default UserContainer;