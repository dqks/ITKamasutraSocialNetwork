import classes from './Users.module.css'
import React from "react";
import UserItem from "./UserItem/UserItem";
import axios from "axios";

let Users = props => {
    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                debugger

                props.setUsers(response.data.items);
            })
    }

    let usersArr = props.users.map(el => <UserItem id={el.id} key={el.id} name={el.name} photo={el.photos.small}
                                                   followed={el.followed} status={el.status}
                                                   follow={props.follow} unfollow={props.unfollow}/>)

    return (<div className={classes.body}>
        <div className={classes.titleWrapper}>
            <h1>
                Users
            </h1>
        </div>
        {usersArr.slice(0, props.showAmount)}
        <div className={classes.showMoreWrapper}>
            {usersArr.length > props.showAmount ?
                <button onClick={props.showMore} className={classes.showMore}>Show more</button> : null}
        </div>
    </div>)
}

export default Users;