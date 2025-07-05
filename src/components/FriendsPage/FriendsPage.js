import classes from "./FriendsPage.module.css";
import Friend from "../Navbar/Friend/Friend";

const FriendsPage = (props) => {
    let friendArr = props.friends
        .map(el => <Friend name={el.name} id={el.id} />)

    return (
        <div className={classes.wrapper}>
            <h2>Friends</h2>
            <div>
                {friendArr}
            </div>
        </div>
    )
}

export default FriendsPage;