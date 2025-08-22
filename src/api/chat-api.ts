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
type EventsNames = "MessageReceived" | "StatusChanged" | "MessagesCleared"

type MessagesReceivedSubscriberType = (messages: MessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type MessagesClearedSubscriberType = () => void

type CallbackType = MessagesReceivedSubscriberType | StatusChangedSubscriberType | MessagesClearedSubscriberType

let subscribers = {
    "MessageReceived": [] as MessagesReceivedSubscriberType[],
    "StatusChanged": [] as StatusChangedSubscriberType[],
    "MessagesCleared": [] as MessagesClearedSubscriberType[]
}
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

    subscribe(eventName: EventsNames, callback: CallbackType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },

    unsubscribe(eventName: EventsNames, callback: CallbackType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
    },

    sendMessage(messageText: string) {
        ws?.send(messageText)
    }
}