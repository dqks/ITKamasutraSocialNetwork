import {Message} from "./Message/Message";
import classes from "./Messages.module.css";
import {useAppSelector} from "../../../hooks/redux";
import {getMessages, getReadyStatus} from "../../../redux/chatSelectors";
import React, {useEffect, useRef, useState} from "react";
import {MessageType} from "../../../redux/chatReducer";
import Preloader from "../../Common/Preloader/Preloader";

type MessagesProps = {}

export const Messages = ({}: MessagesProps) => {
    const messages = useAppSelector(getMessages)
    const messagesAnchor = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const readyStatus = useAppSelector(getReadyStatus)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.target as HTMLElement;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchor.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);

    return (
        <div className={classes.wrapper} onScroll={scrollHandler}>
            {readyStatus === "pending" || readyStatus === "error"
                ? <div className={classes.preloaderWrapper}> <Preloader/> </div>
                : messages.map((m: MessageType,) => <Message
                    key={m.id}
                    userId={m.userId}
                    userName={m.userName}
                    message={m.message}
                    photo={m.photo}/>)}
            <div ref={messagesAnchor}></div>
        </div>
    )
}