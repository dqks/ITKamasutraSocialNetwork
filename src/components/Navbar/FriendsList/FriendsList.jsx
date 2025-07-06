import Friend from "./../Friend/Friend"
import classes from "./FriendsList.module.css";

const FriendsList = (props) => {
    let friendsArr = props.friends
        .map(el => <Friend name={el.name} id={el.id}/>)

    return (
        <div className={classes.friendsWrapper}>
            {friendsArr.slice(0, 3)}
        </div>
    )
}

export default FriendsList;