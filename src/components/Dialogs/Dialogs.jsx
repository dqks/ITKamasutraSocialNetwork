import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {useSelector} from "react-redux";
import {useAuth} from "../../hooks/useAuth";
import MessageForm from "./MessageForm/MessageForm";
import {getDialogs, getMessages} from "../../redux/dialogsSelectors";

const Dialogs = () => {
    useAuth()

    let dialogs = useSelector(getDialogs);
    let messages = useSelector(getMessages);

    let dialogsArr = dialogs
        .map(el => <DialogItem name={el.name} key={el.id} id={el.id}/>)

    let messagesArr = messages
        .map(el => <Message key={el.id} message={el.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsArr}
            </div>

            <div className={classes.messages}>
                {messagesArr}
            </div>

            <div className={classes.messageInput}>
                <MessageForm/>
            </div>
        </div>
    )
}

export default React.memo(Dialogs);