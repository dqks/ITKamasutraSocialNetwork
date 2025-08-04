import classes from "./LoginForm.module.css";
import {Field, Form, Formik} from "formik";
import LoginFormSchema from "../../FormValidation/LoginFormSchema";
import {loginUser} from "../../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import BlockInputComponent from "../../Common/BlockInputComponent/BlockInputComponent";
import {getCaptchaURL} from "../../../redux/authSelectors";
import Captcha from "../Captcha/Captcha";
import {useState} from "react";

const LoginForm = () => {
    const captchaURL = useSelector(getCaptchaURL);
    const dispatch = useDispatch();

    const [captchaValue, setCaptchaValue] = useState("");

    const onCaptchaInputChange = (event) => {
        setCaptchaValue(event.target.value);
    };

    return (
        <Formik
            initialValues={{email: "", password: "", rememberMe: false, generalError: ""}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={(values, {setFieldValue}) => {
                dispatch(loginUser(values.email, values.password, values.rememberMe, setFieldValue, captchaValue));
            }}
            validationSchema={LoginFormSchema}>
            {({values}) => {
                return (
                    <Form>
                        <Field labeltext={"E-mail"} component={BlockInputComponent} type="text" name="email" id="email"
                               size={30}/>
                        <Field labeltext={"Password"} autoComplete="on" component={BlockInputComponent} type="password"
                               name="password"
                               id="password"
                               size={30}/>
                        <div>
                            <Field type="checkbox" name="rememberMe" id="rememberMe"/>
                            <label htmlFor={"rememberMe"}>Remember me</label>
                        </div>
                        <div>
                            {values.generalError ? <p className={classes.errorText}>{values.generalError}</p> : null}
                        </div>
                        <div>
                            <button className={classes.loginButton} type={"submit"} name="loginButton"
                                    id="loginButton">Login
                            </button>
                        </div>
                        {captchaURL && (
                            <Captcha captchaURL={captchaURL}
                                     captchaValue={captchaValue}
                                     onCaptchaInputChange={onCaptchaInputChange}/>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default LoginForm