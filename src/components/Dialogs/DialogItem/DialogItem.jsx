import classes from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import img from "../../../img/avatar.jpg"

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

export default DialogItem;
