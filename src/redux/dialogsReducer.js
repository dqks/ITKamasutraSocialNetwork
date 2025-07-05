const ADD_MESSAGE = "ADD-MESSAGE"
const MESSAGE_TEXT_CHANGE = "MESSAGE-TEXT-CHANGE"

let initialState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
    ],
    messages: [
        {id: "1", message: "Hi"},
        {id: "2", message: "How is your it-kamasutra"},
        {id: "3", message: "Yo"},
        {id: "4", message: "Yo"},
        {id: "5", message: "Yo"},
    ],
    messageText: "",
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TEXT_CHANGE:
            return {...state, messageText: action.message};
        case ADD_MESSAGE:
            let newMessage = {
                message: state.messageText,
            }

            return {...state, messages: [...state.messages,newMessage], messageText: ""};
        default:
            return state;
    }
}

export const messageTextChangeActionCreator = (text) =>
    ({type: MESSAGE_TEXT_CHANGE, message: text})

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export default dialogsReducer;