import {useEffect, useState} from "react";

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

type Message = {
    message: string
    photo: string
    userId: number
    userName: string
}

type ChatMessageType = Array<Message>

const Chat = () => {
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType>([])
    debugger

    useEffect(() => {
        wsChannel.addEventListener("message", (e) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevValue) => [...prevValue, ...newMessages])
            debugger
        });
    }, [])
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages ?
                messages.map((m: Message, index) => <Message key={index} userId={m.userId} userName={m.userName} message={m.message}
                    photo={m.photo}/>)
                : null}
        </div>
    )
}

type MessageProps = {
    userId: number
    message: string
    photo: string
    userName: string
}

const Message = ({message, photo, userName}: MessageProps) => {
    return (
        <div>
            <div>
                <img src={photo} alt="Avatar" style={{width: "50px", height: "50px"}}/>
                <span>{userName}</span>
            </div>
            <p>
                <b>
                    {message}
                </b>
            </p>
        </div>
    )
}

const AddMessageForm = () => {
    const [messageText, setMessageText] = useState('')

    const sendMessage = () => {
        if (!messageText) {
            return;
        }
        wsChannel.send(messageText)
        setMessageText(' ')
    }
    return (
        <div>
            <input onChange={(e) => setMessageText(e.currentTarget.value)} value={messageText} type="text" name="sendMessage" id="sendMessage"/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatPage;