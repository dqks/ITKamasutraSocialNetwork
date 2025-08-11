import React, {memo} from "react"
import classes from "./UserItem.module.css"
import avatar from "../../../assets/avatar.jpg"
import {NavLink} from "react-router-dom";

interface UserItemProps {
    followingInProgress: Array<number>
    id: number
    name: string
    photo: string | null
    followed: boolean
    onFollowButtonClick: Function
    onUnfollowButtonClick: Function
    status: string | null
}

const UserItem = ({
                      followingInProgress,
                      id,
                      name,
                      photo,
                      followed,
                      onFollowButtonClick,
                      onUnfollowButtonClick,
                      status,
                  }: UserItemProps) => {
    return (
        <div className={classes.body}>
            <div className={classes.leftSide}>
                <NavLink to={"/profile/" + id}>
                    <img className={classes.avatar} src={photo != null ? photo : avatar} alt="Avatar"/>
                </NavLink>
                {followed
                    ? <button disabled={followingInProgress.some(uId => uId === id)} className={classes.followButton}
                            onClick={() => onUnfollowButtonClick(id)}>Unfollow</button>
                    : <button disabled={followingInProgress.some(uId => uId === id)} className={classes.followButton}
                            onClick={() => onFollowButtonClick(id)}>Follow</button>}
            </div>
            <div className={classes.rightSide}>
                <div>
                    <p>{name}</p>
                    <p>{status}</p>
                </div>

                <div>
                    <p>Страна</p>
                    <p>Город</p>
                </div>
            </div>

        </div>
    )
}

export default memo(UserItem);