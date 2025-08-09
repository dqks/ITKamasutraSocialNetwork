import {Field, Form, Formik} from "formik";
import classes from "./MessageForm.module.css"
import React from "react";
import MessageFormSchema from "../../FormValidation/MessageFormSchema";
import {useDispatch} from "react-redux";
import {addMessageActionCreator} from "../../../redux/dialogsReducer";

interface MessageFormValues {
    messageText: string;
}

const MessageForm = () => {
    const dispatch = useDispatch();
    const initialValues: MessageFormValues = { messageText: '' };
    return (
        <Formik initialValues= {initialValues}
                onSubmit={(values, actions) => {
                    dispatch(addMessageActionCreator(values.messageText))
                    actions.resetForm()
                }}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={MessageFormSchema}>
            {({errors}) => {
                return (
                    <Form>
                        <Field type={"text"} name={"messageText"}
                               className={[classes.messageText, errors.messageText ? classes.errorBorder : null].join(" ")}
                               size={40}/>
                        <button type={"submit"} className={classes.sendMessage}>Отправить</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default MessageForm;