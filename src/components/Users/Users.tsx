import React, {useCallback} from "react";
import UserItem from "./UserItem/UserItem";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";
import {setCurrentPage, UserType} from "../../redux/usersReducer";
import SearchUserForm from "./SearchUserForm/SearchUserForm";
import {useAppDispatch} from "../../hooks/redux";
import {useSearchParams} from "react-router-dom";
import {useQueryFilter} from "../../hooks/useQueryFilter";

interface UsersProps {
    followingInProgress: Array<number>;
    users: Array<UserType>
    onFollowButtonClick: (id: number) => void
    onUnfollowButtonClick: (id: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

const Users = ({
    followingInProgress,
    users,
    onFollowButtonClick,
    onUnfollowButtonClick,
    currentPage,
    totalUsersCount,
    pageSize
}: UsersProps) => {
    let usersArr = users.map((el) => <UserItem followingInProgress={followingInProgress} id={el.id}
        key={el.id} name={el.name} photo={el.photos.small} followed={el.followed}
        status={el.status}
        onFollowButtonClick={onFollowButtonClick}
        onUnfollowButtonClick={onUnfollowButtonClick}/>)

    const dispatch = useAppDispatch();
    const [simplifiedQuery, fullQuery, searchParams] = useQueryFilter()

    const setCurrentPageMemo = useCallback((page: number) => {
        if (searchParams.get("term") !== null) {
            let friendFilter: boolean | null = null;
            if (searchParams.get("friend") === "true") {
                friendFilter = true
            } else if (searchParams.get("friend") === "false") {
                friendFilter = false
            }
            fullQuery(page,searchParams.get("term"), friendFilter)
        } else {
            simplifiedQuery(page)
        }
        dispatch(setCurrentPage(page))
    }, [])
    return (
        <div className={classes.body}>
            {users.length > 0
                ? <>
                    <Paginator
                        totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        portionSize={9}
                        setCurrentPage={setCurrentPageMemo}
                    />
                    <SearchUserForm/>
                    <div>
                        <h1>
                            Users
                        </h1>
                    </div>
                    {usersArr}
                </>
                : <>
                    <SearchUserForm/>
                    <div>
                        <h1>
                            Users
                        </h1>
                    </div>
                    <h2>
                        No users found by this filter
                    </h2>
                </>}
        </div>
    )
}

export default Users;