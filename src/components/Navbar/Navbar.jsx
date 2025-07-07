import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css"
import FriendsListContainer from "./FriendsList/FriendsListContainer";

const Navbar = (props) => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/profile" className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/dialogs" className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/news" className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/music" className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="settings" className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>Settings</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/users"} className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>
                    <p>Find users</p>
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/friends"} className={({isActive}) =>
                    (isActive ? classes.active : undefined)}>
                    <p>Friends</p>
                </NavLink>
            </div>
            <div className={classes.item}>
                <FriendsListContainer/>
            </div>
        </nav>
    )
}

export default Navbar;