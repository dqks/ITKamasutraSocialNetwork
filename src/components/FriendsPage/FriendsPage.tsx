import classes from "./FriendsPage.module.css";
import Friend from "./Friend/Friend";
import {getFriends} from "../../redux/friendsSelectors";
import {useAppSelector} from "../../hooks/redux";
import {FriendType} from "../../redux/friendsPageReducer";

interface FriendsPageProps {}

const FriendsPage = ({} : FriendsPageProps) => {
    const friends = useAppSelector(getFriends)
    return (
        <div className={classes.wrapper}>
            <h2>Friends</h2>
            <div>
                {friends.map((el : FriendType) => <Friend key={el.id} name={el.name} id={el.id} />)}
            </div>
        </div>
    )
}

export default FriendsPage;