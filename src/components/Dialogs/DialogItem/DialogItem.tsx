import classes from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import React, {memo, useEffect} from "react";
import img from "../../../assets/avatar.jpg"

interface DialogItemProps {
    name: string
    id: number
}

const DialogItem = ({name, id} : DialogItemProps) => {
    return (
        <div>
            <NavLink to={"/dialogs/" + id} className={classes.item}>
                <p className={classes.dialog}>
                    <img src={img} alt="avatar" className={classes.avatar}/>
                    {name}
                </p>
            </NavLink>
        </div>
    );
}

export default memo(DialogItem);