import React from "react";
import UserItem from "./UserItem/UserItem";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";

const Users = (props) => {
    let usersArr = props.users.map(el => <UserItem followingInProgress={props.followingInProgress} id={el.id}
                                                   key={el.id} name={el.name} photo={el.photos.small}
                                                   followed={el.followed} status={el.status}
                                                   onFollowButtonClick={props.onFollowButtonClick}
                                                   onUnfollowButtonClick={props.onUnfollowButtonClick}/>)
    return (<div className={classes.body}>
        <Paginator
                   lastCurrentPage={props.lastCurrentPage}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   pageIncrement={props.pageIncrement}
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