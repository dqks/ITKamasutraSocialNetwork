import classes from "./FriendsPage.module.css";
import Friend from "./Friend/Friend";
import {useSelector} from "react-redux";

const FriendsPage = () => {
    const friends = useSelector(state => state.friendsPage.friends)
    return (
        <div className={classes.wrapper}>
            <h2>Friends</h2>
            <div>
                {friends.map(el => <Friend key={el.id} name={el.name} id={el.id} />)}
            </div>
        </div>
    )
}

export default FriendsPage;