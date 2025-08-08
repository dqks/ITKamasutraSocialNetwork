import logo from "../../assets/Logo.png"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../redux/authReducer";
import {getIsAuth, getLogin} from "../../redux/authSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface HeaderProps {}

const Header = ({} : HeaderProps) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth)
    const login = useAppSelector(getLogin)

    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.login}>
                {isAuth
                    ? <div className={classes.userInfoWrapper}>
                        <p className={classes.loginName}>{login}</p>
                        <button onClick={onLogout} className={classes.logoutButton}>Logout</button>
                    </div>
                    : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;