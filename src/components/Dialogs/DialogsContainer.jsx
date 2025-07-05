import React from "react";
import {messageTextChangeActionCreator, addMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState();

    let messageTextChange = (text) => {
        props.store.dispatch(messageTextChangeActionCreator(text))
    }

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    return (<Dialogs messageTextChange={messageTextChange} addMessage={addMessage}
                     dialogs={state.dialogsPage.dialogs} messages={state.dialogsPage.messages}
    messageText={state.dialogsPage.messageText}/>)
}

export default DialogsContainer;