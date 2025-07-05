import Friend from "./../Friend/Friend"
import classes from "./FriendsList.module.css";
import DialogItem from "../../Dialogs/DialogItem/DialogItem";
import {NavLink} from "react-router-dom";
import FriendsList from "./FriendsList";

const FriendsListContainer = (props) => {
    let friends = props.store.getState().friendsPage.friends;
    return (<FriendsList friends={friends} />)
}

export default FriendsListContainer;