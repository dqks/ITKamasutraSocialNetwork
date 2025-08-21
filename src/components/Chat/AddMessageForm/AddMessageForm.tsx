import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import MessageFormSchema from "../../FormValidation/MessageFormSchema";
import classes from "../../Dialogs/MessageForm/MessageForm.module.css";
import {Button} from "antd";

interface MessageFormValues {
    messageText: string;
}

type AddMessageFormProps = {
    wsChannel: WebSocket | null
}

export const AddMessageForm = ({wsChannel}: AddMessageFormProps) => {
    const initialValues: MessageFormValues = {messageText: ''};
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready");
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
            wsChannel?.close()
            setReadyStatus("pending")
        }
    }, [wsChannel]);

    return (
        <Formik initialValues={initialValues}
            onSubmit={(values,
                actions) => {
                wsChannel?.send(values.messageText)
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