import React from "react"
import classes from "./UserItem.module.css"

const UserItem = props => {

    return (
        <div className={classes.body}>

            <div className={classes.leftSide}>
                <img className={classes.avatar} src={props.avatarUrl} alt="Avatar"/>
                {props.isFollowed ? <button className={classes.followButton} onClick={() => props.unfollow(props.id)}>Unfollow</button> :
                    <button className={classes.followButton} onClick={() => props.follow(props.id)}>Follow</button>}
            </div>
            <div className={classes.rightSide}>
                <div>
                    <p>{props.firstName + " " + props.lastName}</p>
                    <p>{props.description}</p>
                </div>

                <div>
                    <p>{props.location.country}</p>
                    <p>{props.location.city}</p>
                </div>
            </div>

        </div>
    )
}

export default UserItem;