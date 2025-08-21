import {AddMessageForm} from "../../components/Chat/AddMessageForm/AddMessageForm";
import {Messages} from "../../components/Chat/Messages/Messages";
import {useEffect, useState} from "react";
import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";
import {useAppDispatch} from "../../hooks/redux";
import {clearMessages, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";

const ChatPage = () => {
    // const [api, contextHolder] = notification.useNotification();
    // const openNotification = (placement: NotificationPlacement) => {
    //     api.info({
    //         message: `Connection error`,
    //         description:
    //             'Sorry, we are trying to restore connection.',
    //         placement,
    //     });
    // };
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
            dispatch(clearMessages())
        }
    }, []);

    return (
        <div>
            {/*{contextHolder}*/}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


export default ChatPage;