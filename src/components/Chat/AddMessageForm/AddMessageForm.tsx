import React from "react";
import {Field, Form, Formik} from "formik";
import MessageFormSchema from "../../FormValidation/MessageFormSchema";
import classes from "../../Dialogs/MessageForm/MessageForm.module.css";
import {Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {sendMessage} from "../../../redux/chatReducer";
import {getReadyStatus} from "../../../redux/chatSelectors";

interface MessageFormValues {
    messageText: string;
}

type AddMessageFormProps = {}

export const AddMessageForm = ({}: AddMessageFormProps) => {
    const initialValues: MessageFormValues = {messageText: ''};
    const readyStatus = useAppSelector(getReadyStatus);
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
                        <Button disabled={readyStatus !== "ready"}
                            htmlType={"submit"} className={classes.sendMessage}>Отправить</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}