import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type DialogType = {
    name: string,
    id: number
}

export type MessageType = {
    message: string
    id: number
}

type InitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
}

let initialState: InitialStateType = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
    ],
}

const dialogsReducer = createSlice({
    name: "dialogsReducer",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            let newMessage = {
                id: Number(state.messages[state.messages.length - 1].id) + 1,
                message: action.payload,
            }
            state.messages.push(newMessage)
        }
    }
})

export const {addMessage} = dialogsReducer.actions;
export default dialogsReducer.reducer;