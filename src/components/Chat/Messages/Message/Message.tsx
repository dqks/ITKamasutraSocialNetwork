import classes from "./Message.module.css"
import React from "react";

type MessageProps = {
    userId: number
    message: string
    photo: string
    userName: string
}

export const Message = React.memo(({message, photo, userName}: MessageProps) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.userWrapper}>
                <img src={photo} alt="Avatar" className={classes.avatar}/>
                <span>{userName}</span>
            </div>
            <p>
                <b>
                    {message}
                </b>
            </p>
        </div>
    )
})