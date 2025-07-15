import classes from './Login.module.css';

const Login = () => {
    return (
        <div className={classes.body}>
            <h1>Login</h1>

            <div className={classes.wrapper}>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" id="login" size={30}/>
            </div>

            <div className={classes.wrapper}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" size={30}/>
            </div>
        </div>
    )
}

export default Login;