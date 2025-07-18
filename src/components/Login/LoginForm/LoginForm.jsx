import classes from "./LoginForm.module.css";

const LoginForm = () => {
    return (
        <form>
            <div className={classes.wrapper}>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" id="login" size={30}/>
            </div>
            <div className={classes.wrapper}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" size={30}/>
            </div>
            <div>
                <input type="checkbox" name="rememberMe" id="rememberMe"/>
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className={classes.wrapper}>
                <input className={classes.loginButton} type="submit" value={"Login"} name="login" id="login"/>
            </div>
        </form>
    )
}

export default LoginForm