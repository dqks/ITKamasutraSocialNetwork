import {StatusType} from "../redux/chatReducer";

export type MessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

let ws: WebSocket | null = null;

const closeHandler = () => {
    setTimeout(createChannel, 3000)
    notifySubscriberAboutStatus("pending")

}

const openHandler = () => {
    notifySubscriberAboutStatus("ready")
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["MessageReceived"].forEach(subscriber => subscriber(newMessages))
}

const notifySubscriberAboutStatus = (status: StatusType) => {
    subscribers["StatusChanged"].forEach(subscriber => subscriber(status))
}

const errorHandler = () => {
    notifySubscriberAboutStatus("error")
    console.error("Refresh Page")
}

const cleanUpListeners = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("error", errorHandler)
}

const createChannel = () => {
    subscribers["MessagesCleared"].forEach(subscriber => subscriber())
    cleanUpListeners()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscriberAboutStatus("pending")
    ws.addEventListener("open", openHandler)
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("error", errorHandler)
}

//Types for subscribers
type MessagesReceivedCallbackType = (messages: MessageAPIType[]) => void
type StatusChangedCallbackType = (status: StatusType) => void
type MessagesClearedCallbackType = () => void


const subscribers = {
    "MessageReceived": [] as MessagesReceivedCallbackType[],
    "StatusChanged": [] as StatusChangedCallbackType[],
    "MessagesCleared": [] as MessagesClearedCallbackType[]
}

type MessageReceivedObjType = {
    type: "MessageReceived"
    callback: MessagesReceivedCallbackType
}
type StatusChangedObjType = {
    type: "StatusChanged"
    callback: StatusChangedCallbackType
}
type MessagesClearedObjType = {
    type: "MessagesCleared"
    callback: MessagesClearedCallbackType
}

type SubscribeType = MessageReceivedObjType | StatusChangedObjType | MessagesClearedObjType

//Methods for Thunks
export const chatAPI = {
    start() {
        createChannel()
    },

    stop() {
        cleanUpListeners()
        ws?.close()
        subscribers.StatusChanged = []
        subscribers.MessageReceived = []
        subscribers.MessagesCleared = []
    },

    subscribe(subscribeObj: SubscribeType) {
        if (subscribeObj.type === "MessageReceived") {
            subscribers["MessageReceived"].push(subscribeObj.callback)
        } else if (subscribeObj.type === "StatusChanged") {
            subscribers["StatusChanged"].push(subscribeObj.callback)
        } else if (subscribeObj.type === "MessagesCleared") {
            subscribers["MessagesCleared"].push(subscribeObj.callback)
        }
    },

    unsubscribe(subscribeObj: SubscribeType) {
        if (subscribeObj.type === "MessageReceived") {
            subscribers["MessageReceived"] = subscribers["MessageReceived"]
            .filter(el => el !== subscribeObj.callback)
        } else if (subscribeObj.type === "StatusChanged") {
            subscribers["StatusChanged"] = subscribers["StatusChanged"]
            .filter(el => el !== subscribeObj.callback)
        } else if (subscribeObj.type === "MessagesCleared") {
            subscribers["MessagesCleared"] = subscribers["MessagesCleared"]
            .filter(el => el !== subscribeObj.callback)
        }
    },

    sendMessage(messageText: string) {
        ws?.send(messageText)
    }
}