import {AddMessageForm} from "../../components/Chat/AddMessageForm/AddMessageForm";
import {Messages} from "../../components/Chat/Messages/Messages";
import {useEffect} from "react";
import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {getReadyStatus} from "../../redux/chatSelectors";

const ChatPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Connection error`,
            description:
                'Sorry, we are trying to restore connection.',
            placement,
        });
    };
    const dispatch = useAppDispatch();
    const status = useAppSelector(getReadyStatus);

    useEffect(() => {
        if (status === "error") {
            openNotification("topRight")
        }
    }, [status]);

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);

    return (
        <div>
            {contextHolder}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


export default ChatPage;