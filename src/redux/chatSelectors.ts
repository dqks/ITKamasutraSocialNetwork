import {RootState} from "./reduxStore";

export const getMessages = (state : RootState) => state.chat.messages