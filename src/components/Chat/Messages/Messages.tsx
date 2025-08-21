import {useEffect, useState} from "react";
import {Message} from "./Message/Message";
import classes from "./Messages.module.css";

type Message = {
    message: string
    photo: string
    userId: number
    userName: string
}

type ChatMessageType = Array<Message>

type MessagesProps = {
    wsChannel: WebSocket | null
}

export const Messages = ({wsChannel}: MessagesProps) => {
    const [messages, setMessages] = useState<ChatMessageType>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages([...messages, ...newMessages])
        }
        wsChannel?.addEventListener("message", messageHandler);
        return () => {
            wsChannel?.removeEventListener("message", messageHandler);
        }
    }, [wsChannel, messages])
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