import {RootState} from "./reduxStore";

export const getInitialized = (state : RootState) => state.app.initialized;