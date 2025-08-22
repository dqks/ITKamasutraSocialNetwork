import {RootState} from "./reduxStore";

export const getMessages = (state : RootState) => state.chat.messages

export const getReadyStatus = (state : RootState) => state.chat.readyStatus