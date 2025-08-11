import Friend from "../../FriendsPage/Friend/Friend"
import {getFriends} from "../../../redux/friendsSelectors";
import {useAppSelector} from "../../../hooks/redux";
import {FriendType} from "../../../redux/friendsPageReducer";

interface FriendListProps {}

const FriendsList = ({} : FriendListProps) => {
    const friends = useAppSelector(getFriends)

    return (
        <div>
            {friends.map((el : FriendType) => <Friend key={el.id} name={el.name} id={el.id}/>).slice(0, 3)}
        </div>
    )
}

export default FriendsList;