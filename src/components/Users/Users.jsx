import React from "react";
import UserItem from "./UserItem/UserItem";
import classes from './Users.module.css'

const Users = (props) => {
        // let pagesCount =  Math.ceil(props.totalUsersCount / props.pageSize);
        let pages = []
        for (let i = 1; i <= 9; i++) {
            pages.push(i);
        }
        let usersArr = props.users.map(el => <UserItem id={el.id} key={el.id} name={el.name} photo={el.photos.small}
                                                               followed={el.followed} status={el.status}
                                                       onFollowButtonClick={props.onFollowButtonClick} onUnfollowButtonClick={props.onUnfollowButtonClick}/>)
        return (<div className={classes.body}>
            {pages.map(page =>
                <span key={page} onClick={() => props.onPageChanged(page)} className={[props.currentPage === page && classes.selectedPage, classes.pageNumber].join(' ') }>{page}</span>)}
            <div className={classes.titleWrapper}>
                <h1>
                    Users
                </h1>
            </div>
            {usersArr}
        </div>)

}

export default Users;