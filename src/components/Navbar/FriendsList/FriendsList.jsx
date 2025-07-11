import Friend from "../../FriendsPage/Friend/Friend"
import classes from "./FriendsList.module.css";
import {useSelector} from "react-redux";

const FriendsList = () => {
    const friends = useSelector(state => state.friendsPage.friends)

    return (
        <div className={classes}>
            {friends.map(el => <Friend key={el.id} name={el.name} id={el.id}/>).slice(0, 3)}
        </div>
    )
}

export default FriendsList;