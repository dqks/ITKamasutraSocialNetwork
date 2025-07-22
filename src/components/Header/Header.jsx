import logo from "../../assets/Logo.png"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/authReducer";
import {getIsAuth, getLogin} from "../../redux/authSelectors";

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)
    // let photo = useSelector(state => state.auth.userPhoto)

    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.login}>
                {isAuth
                    ? <div className={classes.userInfoWrapper}>
                        {/*{photo ? <img className={classes.photo} src={photo} alt="Avatar"/> : null}*/}
                        <p className={classes.loginName}>{login}</p>
                        <button onClick={onLogout} className={classes.logoutButton}>Logout</button>
                    </div>
                    : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header;