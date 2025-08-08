import preloader from "../../../assets/tube-spinner.svg";
import React from "react";
import classes from "./Preloader.module.css"

interface PreloaderProps {}

const Preloader = ({} : PreloaderProps) => {
    return (
        <>
            <img className={classes.preloader} src={preloader} alt={"Preloader"}/>
        </>
    )
}

export default Preloader;