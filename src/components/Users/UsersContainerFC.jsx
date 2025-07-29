import {useDispatch, useSelector} from "react-redux";
import {
    followUser,
    requestUsers,
    setNextCurrentPage,
    setPreviousCurrentPage,
    unfollowUser
} from "../../redux/usersReducer";
import React, {memo, useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import {
    getCurrentPage, getFirstCurrentPage,
    getFollowingInProgress,
    getIsFetching, getLastCurrentPage,
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
    const firstCurrentPage = useSelector(getFirstCurrentPage)
    const lastCurrentPage = useSelector(getLastCurrentPage)
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

    const onNextPageButtonClick = () => {
        dispatch(setNextCurrentPage())
    }

    const onPreviousPageButtonClick = () => {
        dispatch(setPreviousCurrentPage())
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
                         firstCurrentPage={firstCurrentPage}
                         lastCurrentPage={lastCurrentPage}
                         onNextPageButtonClick={onNextPageButtonClick}
                         onPreviousPageButtonClick={onPreviousPageButtonClick}
                />
            }

        </>
    )
}

export default memo(UserContainerFC);