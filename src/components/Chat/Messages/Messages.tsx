import {Message} from "./Message/Message";
import classes from "./Messages.module.css";
import {useAppSelector} from "../../../hooks/redux";
import {getMessages} from "../../../redux/chatSelectors";

type Message = {
    message: string
    photo: string
    userId: number
    userName: string
}

type ChatMessageType = Array<Message>

type MessagesProps = {
}

export const Messages = ({}: MessagesProps) => {

    const messages = useAppSelector(getMessages)

    return (
        <div className={classes.wrapper}>
            {messages ?
                messages.map((m: Message,
                    index) => <Message key={index} userId={m.userId} userName={m.userName} message={m.message}
                    photo={m.photo}/>)
                : null}
        </div>
    )
}