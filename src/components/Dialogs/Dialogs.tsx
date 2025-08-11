import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {useAuth} from "../../hooks/useAuth";
import MessageForm from "./MessageForm/MessageForm";
import {getDialogs, getMessages} from "../../redux/dialogsSelectors";
import {useAppSelector} from "../../hooks/redux";
import {DialogType, MessageType} from "../../redux/dialogsReducer";

interface DialogProps {}

const Dialogs = ({} : DialogProps) => {
    useAuth();

    const dialogs = useAppSelector(getDialogs);

    const messages = useAppSelector(getMessages);
    const dialogsArr = dialogs
        .map((el : DialogType) => <DialogItem name={el.name} key={el.id} id={el.id}/>)

    const messagesArr = messages
        .map((el : MessageType) => <Message key={el.id} message={el.message}/>)

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

export default Dialogs;