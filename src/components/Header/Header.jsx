import logo from "../../assets/Logo.png"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserDataActionCreator} from "../../redux/authReducer";

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth)
    const login = useSelector(state => state.auth.login)

    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(response.data.data));
                }
            })
    }, []);



    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.login}>
                {isAuth
                    ? <p className={classes.loginName}>{login}</p>
                    : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header;