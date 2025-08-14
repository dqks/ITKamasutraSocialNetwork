import React from "react";
import UserItem from "./UserItem/UserItem";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";
import {setCurrentPage, UserType} from "../../redux/usersReducer";
import SearchUserForm from "./SearchUserForm/SearchUserForm";

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
    return (<div className={classes.body}>
        <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            portionSize={9}
            setCurrentPage={setCurrentPage}
        />
        <SearchUserForm/>
        <div>
            <h1>
                Users
            </h1>
        </div>
        {usersArr}
    </div>)
}

export default Users;