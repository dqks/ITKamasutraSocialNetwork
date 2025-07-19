import classes from "./LoginForm.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import LoginFormSchema from "../../FormValidation/LoginFormSchema";
import {loginUser} from "../../../redux/authReducer";
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{email: "", password: "", rememberMe: false}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={values => {
                dispatch(loginUser(values.email, values.password, values.rememberMe));
            }}
            validationSchema={LoginFormSchema}>
                <Form>
                    <div className={classes.wrapper}>
                        <label htmlFor="email">E-mail</label>
                        <Field type="text" name="email" id="email" size={30}/>
                    </div>
                    <ErrorMessage className={classes.errorText} name="email" component="p"/>
                    <div className={classes.wrapper}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" size={30}/>
                    </div>
                    <ErrorMessage className={classes.errorText} name="password" component="p"/>
                    <div>
                        <Field type="checkbox" name="rememberMe" id="rememberMe"/>
                        <label htmlFor={"rememberMe"}>Remember me</label>
                    </div>
                    <div className={classes.wrapper}>
                        <button className={classes.loginButton} type={"submit"} name="loginButton"
                                id="loginButton">Login
                        </button>
                    </div>
                </Form>
        </Formik>
    )
}

export default LoginForm