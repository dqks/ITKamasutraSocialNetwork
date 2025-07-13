import logo from "../../assets/Logo.png"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserImageActionCreator, setUserDataActionCreator} from "../../redux/authReducer";
import {authAPI} from "../../api/api";

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth)
    const login = useSelector(state => state.auth.login)
    let photo = useSelector(state => state.auth.userPhoto)

    useEffect(() => {
        authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(data.data));
                    axios.get("https://social-network.samuraijs.com/api/1.0/profile/" + data.data.id)
                        .then((data) => {
                            if (data.data.photos.small) {
                                dispatch(setCurrentUserImageActionCreator(data.data.photos.small));
                            }
                        })
                }
            })
    }, []);

    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.login}>
                {isAuth
                    ? <div className={classes.userInfoWrapper}>
                        {photo ? <img className={classes.photo} src={photo} alt="Photo"/> : null}
                        <p className={classes.loginName}>{login}</p>
                    </div>
                    : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header;