import classes from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import React, {memo} from "react";
import img from "../../../assets/avatar.jpg"

const DialogItem = (props) => {
    return (
        <div>
            <NavLink to={"/dialogs/" + props.id} className={classes.item}>
                <p className={classes.dialog}>
                    <img src={img} alt="avatar" className={classes.avatar}/>
                    {props.name}
                </p>
            </NavLink>
        </div>
    );
}

export default memo(DialogItem);
