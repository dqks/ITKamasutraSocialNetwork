import preloader from "../../assets/tube-spinner.svg";
import React from "react";
import classes from "./Preloader.module.css"

const Preloader = () => {
    return (
        <>
            <img className={classes.preloader} src={preloader} alt={"Preloader"}/>
        </>
    )
}

export default Preloader;