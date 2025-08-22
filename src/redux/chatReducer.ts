import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chatAPI, MessageAPIType} from "../api/chat-api";
import {ActionsTypes, ThunkActionType} from "./reduxStore";
import {Dispatch} from "react";
import {v1} from "uuid";

export type MessageType = MessageAPIType & { id: string };

export type StatusType = "pending" | "ready" | "error"

type ChatStateType = {
    messages: MessageType[],
    readyStatus: StatusType
}

const initialState: ChatStateType = {
    messages: [],
    readyStatus: "pending",
}

const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setMessages(state,
            action: PayloadAction<MessageAPIType[]>) {
            state.messages = [...state.messages, ...action.payload.map(m => ({...m, id: v1()}))].filter((_,
                index,
                arr) => index >= arr.length - 100);
        },
        clearMessages(state) {
            state.messages = [];
        },
        updateReadyStatus(state,
            action: PayloadAction<StatusType>) {
            state.readyStatus = action.payload;
        },
    }
})

type ChatActionsTypes = ActionsTypes<typeof chatReducer.actions>

type ChatThunkAction = ThunkActionType<ChatActionsTypes>

let _newMessageHandler: ((messages: MessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch<any>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch<any>) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(updateReadyStatus(status))
        }
    }
    return _statusChangedHandler
}

let _messagesClearedHandler: (() => void) | null = null
const messagesClearedHandlerCreator = (dispatch: Dispatch<any>) => {
    if (_messagesClearedHandler === null) {
        _messagesClearedHandler = () => {
            dispatch(clearMessages())
        }
    }
    return _messagesClearedHandler
}

export const startMessagesListening = (): ChatThunkAction => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe("MessageReceived", newMessageHandlerCreator(dispatch))
        chatAPI.subscribe("StatusChanged", statusChangedHandlerCreator(dispatch))
        chatAPI.subscribe("MessagesCleared", messagesClearedHandlerCreator(dispatch))
    }
}

export const stopMessagesListening = (): ChatThunkAction => {
    return async (dispatch) => {
        chatAPI.unsubscribe("StatusChanged", statusChangedHandlerCreator(dispatch))
        chatAPI.unsubscribe("MessageReceived", newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe("MessagesCleared", messagesClearedHandlerCreator(dispatch))
        dispatch(clearMessages())
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ChatThunkAction => {
    return async () => {
        chatAPI.sendMessage(message)
    }
}

export const {setMessages, clearMessages, updateReadyStatus} = chatReducer.actions
export default chatReducer.reducer