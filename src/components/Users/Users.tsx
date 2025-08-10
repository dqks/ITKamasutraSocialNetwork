import React from "react";
import UserItem from "./UserItem/UserItem";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";
import {User} from "../../redux/usersReducer";

interface UsersProps {
    followingInProgress: Array<number>;
    users: Array<User>
    onFollowButtonClick: (id: number) => void
    onUnfollowButtonClick: (id: number) => void
    onPageChanged: (page: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

const Users = ({
                   followingInProgress,
                   users,
                   onFollowButtonClick,
                   onUnfollowButtonClick,
                   onPageChanged,
                   currentPage,
                   totalUsersCount,
                   pageSize
               }: UsersProps) => {
    let usersArr = users.map((el) => <UserItem followingInProgress={followingInProgress} id={el.id}
                                               key={el.id} name={el.name} photo={el.photos.small}
                                               followed={el.followed} status={el.status}
                                               onFollowButtonClick={onFollowButtonClick}
                                               onUnfollowButtonClick={onUnfollowButtonClick}/>)
    return (<div className={classes.body}>
        <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            portionSize={9}
        />
        <div>
            <h1>
                Users
            </h1>
        </div>
        {usersArr}
    </div>)

}

export default Users;