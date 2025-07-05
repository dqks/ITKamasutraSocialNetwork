import Friend from "./../Friend/Friend"
import classes from "./FriendsList.module.css";
import DialogItem from "../../Dialogs/DialogItem/DialogItem";
import {NavLink} from "react-router-dom";

const FriendsList = (props) => {
    let friendsArr = props.friends
        .map(el => <Friend name={el.name} id={el.id}/>)

    return (
        <div className={classes.friendsWrapper}>
            {friendsArr[0]}
            {friendsArr[1]}
            {friendsArr[2]}
        </div>
    )
}

export default FriendsList;