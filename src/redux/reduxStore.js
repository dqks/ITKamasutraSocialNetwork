import {combineReducers} from "redux"
import {configureStore} from '@reduxjs/toolkit'
import dialogsReducer from "./dialogsReducer";
import friendsPageReducer from "./friendsPageReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsPageReducer,
    usersPage: usersReducer
});

let store = configureStore({reducer: reducers});

window.store = store;

export default store;