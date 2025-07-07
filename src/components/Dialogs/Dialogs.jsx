import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = (props) => {
    let dialogsArr = props.dialogsPage.dialogs
    .map(el => <DialogItem name={el.name} key={el.id} id={el.id} />)

    let messagesArr = props.dialogsPage.messages
    .map(el => <Message key={el.id} message={el.message} />)


    let messageTextChange = (event) => {
        props.messageTextChange(event.target.value)
    }

    let addMessage = () => {
        props.addMessage()
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
                <input className={classes.messageText} size={40} onChange={messageTextChange} cols="30" rows="1" value={props.dialogsPage.messageText}></input>
                <button className={classes.sendMessage} onClick={addMessage}>Отправить</button>
            </div>
        </div>
    )
}

export default Dialogs;