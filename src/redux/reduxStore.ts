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

export const store = () => {
    return configureStore({
        reducer: reducers
    });
}

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];

// window.store = store;

export default store;