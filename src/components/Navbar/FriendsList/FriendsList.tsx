import Friend from "../../FriendsPage/Friend/Friend"
import classes from "./FriendsList.module.css";
import {useSelector} from "react-redux";
import {getFriends} from "../../../redux/friendsSelectors";
import {useAppSelector} from "../../../hooks/redux";

interface FriendListProps {}

const FriendsList = ({} : FriendListProps) => {
    const friends = useAppSelector(getFriends)

    return (
        <div>
            {friends.map(el => <Friend key={el.id} name={el.name} id={el.id}/>).slice(0, 3)}
        </div>
    )
}

export default FriendsList;