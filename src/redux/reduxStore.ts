import {combineReducers} from "redux"
import {configureStore} from '@reduxjs/toolkit'
import dialogsReducer from "./dialogsReducer";
import friendsPageReducer from "./friendsPageReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import musicReducer from "./musicReducer";
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsPageReducer,
    usersPage: usersReducer,
    musicPage: musicReducer,
    auth: authReducer,
    app: appReducer,
});

export const store = configureStore({
    reducer: reducers
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];

declare global {
    interface Window {
        store: AppStore; // Add your custom store property here
    }
}

window.store = store;

export default store;