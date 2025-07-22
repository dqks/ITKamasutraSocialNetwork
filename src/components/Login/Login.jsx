import classes from './Login.module.css';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import {useEffect} from "react";
import {getIsAuth} from "../../redux/authSelectors";

const Login = () => {
    const auth = useSelector(getIsAuth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth) {
            navigate(-1)
        }
    }, [navigate, auth, location]);

    return (
        <div className={classes.body}>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;