export type Message = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type ChatMessageType = Array<Message>

type SubscriberType = (messages: ChatMessageType) => void

let ws: WebSocket | null = null;

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(subscriber => subscriber(newMessages))
}

const createChannel = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)
}

let subscribers = [] as SubscriberType[]

export const chatAPI = {
    start () {
      createChannel()
    },

    stop () {
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
        subscribers = []
    },

    subscribe (callback: SubscriberType) {
        subscribers.push(callback)
    },

    unsubscribe (callback: SubscriberType) {
        subscribers = subscribers.filter(el => el !== callback)
    },

    sendMessage (messageText: string) {
      ws?.send(messageText)
    }

}