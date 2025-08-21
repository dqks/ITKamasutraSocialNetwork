import {AddMessageForm} from "../../components/Chat/AddMessageForm/AddMessageForm";
import {Messages} from "../../components/Chat/Messages/Messages";
import {useEffect, useState} from "react";
import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";

const ChatPage = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Connection error`,
            description:
                'Sorry, we are trying to restore connection.',
            placement,
        });
    };

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            setTimeout(createChannel, 3000)
            openNotification("topRight")
        }

        const createChannel = () => {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            setWsChannel(ws)
            ws.addEventListener("close", closeHandler)
        }

        createChannel()
        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    }, []);
    return (
        <div>
            {contextHolder}
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}


export default ChatPage;