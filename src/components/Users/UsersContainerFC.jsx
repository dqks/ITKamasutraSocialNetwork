import {useDispatch, useSelector} from "react-redux";
import {
    followUser,
    requestUsers,
    setFirstCurrentPage,
    setLastCurrentPage,
    unfollowUser
} from "../../redux/usersReducer";
import React, {memo, useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getCurrentPage,
    getFirstCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getLastCurrentPage, getPageIncrement,
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
    const baseFirstCurrentPage = useSelector(getFirstCurrentPage)
    const baseLastCurrentPage = useSelector(getLastCurrentPage)
    const isFetching = useSelector(getIsFetching)
    const followingInProgress = useSelector(getFollowingInProgress)
    const pageIncrement = useSelector(getPageIncrement);

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
            {isFetching
                ? <Preloader/>
                : <Users followingInProgress={followingInProgress} users={users}
                         onFollowButtonClick={onFollowButtonClick}
                         onUnfollowButtonClick={onUnfollowButtonClick}
                         onPageChanged={onPageChanged}
                         currentPage={currentPage} totalUsersCount={totalUsersCount}
                         pageSize={pageSize}
                         firstCurrentPage={baseFirstCurrentPage}
                         lastCurrentPage={baseLastCurrentPage}
                         storeFirstCurrentPage={setFirstCurrentPage}
                         storeLastCurrentPage={setLastCurrentPage}
                         pageIncrement={pageIncrement}
                />
            }

        </>
    )
}

export default memo(UserContainerFC);