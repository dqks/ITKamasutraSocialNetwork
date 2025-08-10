const ADD_MESSAGE = "dialogs/ADD_MESSAGE"

type DialogType = {
    name: string,
    id: number
}

type MessageType = {
    message: string
    id: number
}

type InitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
}

let initialState : InitialStateType = {
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

const dialogsReducer = (state = initialState, action : DialogsActionTypes) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: Number(state.messages[state.messages.length - 1].id) + 1,
                message: action.messageText,
            }
            return {...state, messages: [...state.messages, newMessage]};
        default:
            return state;
    }
}

type DialogsActionTypes = AddMessageType

type AddMessageType = {
    type: typeof ADD_MESSAGE
    messageText: string
}

export const addMessageActionCreator = (messageText : string) => ({type: ADD_MESSAGE, messageText})

export default dialogsReducer;