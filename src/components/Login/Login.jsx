import classes from './Login.module.css';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
    const auth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    if (auth) {
        navigate(-1)
    }

    return (
        <div className={classes.body}>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;