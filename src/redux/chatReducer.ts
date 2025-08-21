import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {ActionsTypes, ThunkActionType} from "./reduxStore";
import {Dispatch} from "react";

type ChatStateType = {
    messages: ChatMessageType
}

const initialState: ChatStateType = {
    messages: []
}

const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<ChatMessageType>) {
            state.messages = [...state.messages, ...action.payload];
        },
        clearMessages(state) {
            state.messages = [];
        }
    }
})

type ChatActionsTypes = ActionsTypes<typeof chatReducer.actions>

type ChatThunkAction = ThunkActionType<ChatActionsTypes>

let _newMessageHandler: ((messages: ChatMessageType) => void) | null = null
const newMessageHandlerCreator = (dispatch : Dispatch<any>) => {
        if (_newMessageHandler === null) {
            _newMessageHandler = (messages) => {
                dispatch(setMessages(messages))
            }
        }
        return _newMessageHandler
}

export const startMessagesListening = () : ChatThunkAction => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }
}

export const stopMessagesListening = () : ChatThunkAction => {
    return async (dispatch) => {
        chatAPI.stop()
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    }
}

export const sendMessage = (message: string) : ChatThunkAction => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}

export const { setMessages, clearMessages } = chatReducer.actions
export default chatReducer.reducer