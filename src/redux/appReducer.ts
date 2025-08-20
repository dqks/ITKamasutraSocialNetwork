import {getAuthUser} from "./authReducer";
import {ActionsTypes, ThunkActionType} from "./reduxStore";
import {createSlice} from "@reduxjs/toolkit";

export interface InitialStateType {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false,
};

const appReducer = createSlice({
    name: "appReducer",
    initialState,
    reducers: {
        initializedSuccess: (state) => {
            state.initialized = true;
        }
    }
})

type AppActionsTypes = ActionsTypes<typeof appReducer.actions> // all action types

type AppThunk = ThunkActionType<AppActionsTypes>

export const initializeApp = (signal?: AbortSignal): AppThunk => {
    return async (dispatch) => {
        try {
            await dispatch(getAuthUser(signal));
            dispatch(initializedSuccess());
        } catch (error) {
            console.log(error);
        }

    }
}

export const {initializedSuccess} = appReducer.actions;
export default appReducer.reducer;