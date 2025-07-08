import classes from "./Musics.module.css"
import React from "react";
import MusicItem from "./MusicItem/MusicItem";

const Musics = (props) => {
    return (
        <div className={classes.body}>
            <div>
                <h1>
                    Music
                </h1>
            </div>
            <div className={classes.musicWrapper}>
                {
                    props.tracks.map(track => <MusicItem key={track.id} logo={track.logo} name={track.name}
                                                          singer={track.singer} src={track.src}/>)
                }
            </div>
        </div>

    )
}

export default Musics;