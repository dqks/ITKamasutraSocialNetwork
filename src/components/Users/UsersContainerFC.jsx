import {connect, useDispatch, useSelector} from "react-redux";
import {followUser, requestUsers, unfollowUser} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";

const UserContainerFC = () => {
    const dispatch = useDispatch();

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const isFetching = useSelector(getIsFetching)
    const followingInProgress = useSelector(getFollowingInProgress)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, []);

    const onPageChanged = (page) => {
        dispatch(requestUsers(page, pageSize));
    }

    const onFollowButtonClick = (id) => {
        dispatch(followUser(id));
    }

    const onUnfollowButtonClick = (id) => {
        dispatch(unfollowUser(id));
    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users followingInProgress={followingInProgress} users={users}
                   onFollowButtonClick={onFollowButtonClick}
                   onUnfollowButtonClick={onUnfollowButtonClick} onPageChanged={onPageChanged}
                   currentPage={currentPage} totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        </>
    )
}

export default UserContainerFC;