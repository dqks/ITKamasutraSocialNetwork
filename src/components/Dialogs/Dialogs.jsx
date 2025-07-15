import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMessageActionCreator, messageTextChangeActionCreator} from "../../redux/dialogsReducer";
import {useAuth} from "../../hooks/useAuth";

const Dialogs = () => {
    let isAuth = useSelector(state => state.auth.isAuth);
    useAuth(isAuth)

    let dialogs = useSelector(state => state.dialogsPage.dialogs);
    let messages = useSelector(state => state.dialogsPage.messages);
    let messageText = useSelector(state => state.dialogsPage.messageText);

    let dispatch = useDispatch()

    let dialogsArr = dialogs
    .map(el => <DialogItem name={el.name} key={el.id} id={el.id} />)

    let messagesArr = messages
    .map(el => <Message key={el.id} message={el.message} />)

    let messageTextChange = event => {
        // props.messageTextChange(event.target.value)
        dispatch(messageTextChangeActionCreator(event.target.value))
    }

    let addMessage = () => {
        // props.addMessage()
        dispatch(addMessageActionCreator())
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsArr}
            </div>

            <div className={classes.messages}>
                {messagesArr}
            </div>

            <div className={classes.messageInput}>
                <input className={classes.messageText} size={40} onChange={messageTextChange} value={messageText}></input>
                <button className={classes.sendMessage} onClick={addMessage}>Отправить</button>
            </div>
        </div>
    )
}

export default React.memo(Dialogs);