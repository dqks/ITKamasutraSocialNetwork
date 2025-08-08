import React from "react";
import classes from "./MusicItem.module.css";

interface MusicItemProps {
    logo: string
    name: string
    singer: string
    src: string
}

const Music = ({logo, name, singer, src} : MusicItemProps) => {
    return (
        <div className={classes.item}>
            <div className={classes.info}>
                <img alt={"Logo"} src={logo} className={classes.logo}/>
                <span>{name}</span>
                <span>{singer}</span>
            </div>
            <div className={classes.audio}>
                <audio controls={true} src={src}></audio>
            </div>
        </div>
    )
}

export default Music;