import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import MessageFormSchema from "../../FormValidation/MessageFormSchema";
import classes from "../../Dialogs/MessageForm/MessageForm.module.css";
import {Button} from "antd";
import {useAppDispatch} from "../../../hooks/redux";
import {sendMessage} from "../../../redux/chatReducer";

interface MessageFormValues {
    messageText: string;
}

type AddMessageFormProps = {
}

export const AddMessageForm = ({}: AddMessageFormProps) => {
    const initialValues: MessageFormValues = {messageText: ''};
    // const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");
    const dispatch = useAppDispatch()

    return (
        <Formik initialValues={initialValues}
            onSubmit={(values,
                actions) => {
                dispatch(sendMessage(values.messageText))
                actions.resetForm()
            }}
            validateOnBlur={false}
            validateOnChange={true}
            validationSchema={MessageFormSchema}>
            {() => {
                return (
                    <Form>
                        <Field type={"text"} name={"messageText"}
                            className={classes.messageText}
                            size={40}/>
                        <Button disabled={false}
                            htmlType={"submit"} className={classes.sendMessage}>Отправить</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}