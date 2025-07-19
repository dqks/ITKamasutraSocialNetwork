import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./MessageForm.module.css"
import React from "react";
import MessageFormSchema from "../../FormValidation/MessageFormSchema";
import {useDispatch} from "react-redux";
import {addMessageActionCreator} from "../../../redux/dialogsReducer";

const MessageForm = () => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{messageText: ""}}
                onSubmit={(values, actions) => {
                    dispatch(addMessageActionCreator(values.messageText))
                    actions.resetForm()
                }}
                validationSchema={MessageFormSchema}>
            <Form>
                <Field type={"text"} name={"messageText"} className={classes.messageText} size={40}/>
                <button type={"submit"} className={classes.sendMessage}>Отправить</button>
                <ErrorMessage className={classes.errorText} name={"messageText"} component={"p"}/>
            </Form>
        </Formik>
    )
}

export default MessageForm;