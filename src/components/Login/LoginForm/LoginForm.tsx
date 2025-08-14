import classes from "./LoginForm.module.css";
import {Field, Form, Formik} from "formik";
import LoginFormSchema from "../../FormValidation/LoginFormSchema";
import {loginUser} from "../../../redux/authReducer";
import BlockInputComponent from "../../Common/BlockInputComponent/BlockInputComponent";
import {getCaptchaURL} from "../../../redux/authSelectors";
import Captcha from "../Captcha/Captcha";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

export type LoginInitialValues = {
    email: string
    password: string
    rememberMe: boolean
    generalError: string
}

const LoginForm = () => {
    const captchaURL = useAppSelector(getCaptchaURL);
    const dispatch = useAppDispatch();

    const [captchaValue, setCaptchaValue] = useState<string>("");

    const onCaptchaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaValue(event.target.value);
    };

    const initialValues: LoginInitialValues = {email: "", password: "", rememberMe: false, generalError: ""}

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors: Partial<Record<keyof LoginInitialValues, string>> = {};
                if (!values.email) {
                    console.log("email required");
                    errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    console.log("email Invalid");
                    errors.email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={(values,
                {setFieldValue}) => {
                dispatch(loginUser(values.email, values.password, values.rememberMe, setFieldValue, captchaValue));
            }}
            validationSchema={LoginFormSchema}
        >
            {({values}) => {
                return (
                    <Form>
                        <Field labeltext={"E-mail"} component={BlockInputComponent} type="text" name="email"
                            size={30}/>
                        <Field labeltext={"Password"} autoComplete="on" component={BlockInputComponent} type="password"
                            name="password"
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