import React, {memo} from "react";
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
        <Paginator firstCurrentPage={props.firstCurrentPage}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   lastCurrentPage={props.lastCurrentPage}
                   onNextPageButtonClick={props.onNextPageButtonClick}
                   onPreviousPageButtonClick={props.onPreviousPageButtonClick}
        />
        <div>
            <h1>
                Users
            </h1>
        </div>
        {usersArr}
    </div>)

}

export default memo(Users);