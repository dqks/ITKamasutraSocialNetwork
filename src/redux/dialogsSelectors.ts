import {RootState} from "./reduxStore";

export const getDialogs = (state : RootState) => state.dialogsPage.dialogs;

export const getMessages = (state : RootState) => state.dialogsPage.messages;