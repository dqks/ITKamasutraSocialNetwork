import React from "react"
import classes from "./UserItem.module.css"
import avatar from "../../../assets/avatar.jpg"

const UserItem = props => {

    return (
        <div className={classes.body}>

            <div className={classes.leftSide}>
                <img className={classes.avatar} src={props.photo != null ? props.photo : avatar} alt="Avatar"/>
                {props.followed ? <button className={classes.followButton} onClick={() => props.unfollow(props.id)}>Unfollow</button> :
                    <button className={classes.followButton} onClick={() => props.follow(props.id)}>Follow</button>}
            </div>
            <div className={classes.rightSide}>
                <div>
                    <p>{props.name}</p>
                    <p>{props.status}</p>
                </div>

                <div>
                    <p>Страна</p>
                    <p>Город</p>
                </div>
            </div>

        </div>
    )
}

export default UserItem;