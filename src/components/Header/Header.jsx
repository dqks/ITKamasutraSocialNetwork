import logo from "../../assets/Logo.png"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserImageActionCreator, setUserDataActionCreator} from "../../redux/authReducer";
import avatar from "../../assets/avatar.jpg"

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth)
    const login = useSelector(state => state.auth.login)
    let photo = useSelector(state => state.auth.userPhoto)

    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(response.data.data));
                    axios.get("https://social-network.samuraijs.com/api/1.0/profile/" + response.data.data.id)
                        .then((response) => {
                            if (response.data.photos.small) {
                                dispatch(setCurrentUserImageActionCreator(response.data.photos.small));
                            } else {
                                dispatch(setCurrentUserImageActionCreator("default"));
                            }
                        })
                }
            })
    }, []);

    if (photo === "default") {
        photo = avatar
    }

    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.login}>
                {isAuth
                    ? <div className={classes.userInfoWrapper}>
                        <img className={classes.photo} src={photo} alt="Photo"/>
                        <p className={classes.loginName}>{login}</p>
                    </div>
                    : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header;