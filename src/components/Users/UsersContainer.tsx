import {followUserThunk, requestUsers, unfollowUserThunk} from "../../redux/usersReducer";
import React, {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useSearchParams} from "react-router-dom";

interface UserContainerProps {
}

const UserContainer = ({}: UserContainerProps) => {
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("currentPage"))

    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const pageSize = useAppSelector(getPageSize)
    const isFetching = useAppSelector(getIsFetching)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    useEffect(() => {
        const term = searchParams.get("term")
        const friend = searchParams.get("friend")

        let friendFilter: boolean | null = null;
        if (friend === "true") {
            friendFilter = true
        } else if (friend === "false") {
            friendFilter = false
        }

        let nameTerm: string = term === null ? '' : term;

        dispatch(requestUsers(currentPage, nameTerm, friendFilter))
    }, [searchParams, pageSize]);

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