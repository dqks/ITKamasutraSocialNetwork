import classes from "./Friend.module.css"
import avatar from "../../../assets/avatar.jpg"
import {NavLink} from "react-router-dom";

interface FriendProps {
    name: string
    id: number
}

const Friend = ({name, id} : FriendProps) => {
    return (
        <NavLink to={"/profile/" + id}>
            <div className={classes.item}>
                <img className={classes.avatar} src={avatar} alt="Friend image"/>
                <p>{name}</p>
            </div>
        </NavLink>
    )
}

export default Friend;