import React from "react";
import classes from "./MusicItem.module.css";

const Music = props => {
    return (
        <div className={classes.item}>
            <div className={classes.info}>
                <img alt={"Logo"} src={props.logo} className={classes.logo}/>
                <span>{props.name}</span>
                <span>{props.singer}</span>
            </div>
            <div className={classes.audio}>
                <audio controls={true} src={props.src} onPlaying={() => console.log(3232)}></audio>
            </div>
        </div>
    )
}

export default Music;