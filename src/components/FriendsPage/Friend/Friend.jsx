import classes from "./Friend.module.css"
import avatar from "../../../assets/avatar.jpg"
import {NavLink} from "react-router-dom";


const Friend = (props) => {
    return (
        <NavLink to={"/profile/" + props.id}>
            <div className={classes.item}>
                <img className={classes.avatar} src={avatar} alt="Friend image"/>
                <p>{props.name}</p>
            </div>
        </NavLink>
    )
}

export default Friend;

