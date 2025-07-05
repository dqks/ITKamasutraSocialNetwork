import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import friendsPageReducer from "./friendsPageReducer"

let store = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: "Hi, how are you?", likeCount: "10"},
                {id: 2, message: "It's my first post", likeCount: "0"},
                {id: 3, message: "It", likeCount: "0"},
            ],
            newPostText: ""
        },
        dialogsPage: {
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
        },
        friendsPage: {
            friends: [
                {name: "Andrew", id: "1"},
                {name: "Sasha", id: "2"},
                {name: "Sveta", id: "3"},
                {name: "Maxim", id: "4"},
                {name: "Alexey", id: "5"},
                {name: "Anton", id: "6"},
            ]
        }
    },

    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("Subscriber was not defined")
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = friendsPageReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}

export default store;