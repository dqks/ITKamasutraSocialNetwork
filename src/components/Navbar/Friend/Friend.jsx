import classes from "./Friend.module.css"
import avatar from "./../../../img/avatar.jpg"
import {NavLink} from "react-router-dom";


const Friends = (props) => {
    return (
        <NavLink to={"/profile/" + props.id}>
            <div className={classes.item}>
                <img className={classes.avatar} src={avatar} alt="Friend image"/>
                <p className={classes.name}>{props.name}</p>
            </div>
        </NavLink>
    )
}

export default Friends;

