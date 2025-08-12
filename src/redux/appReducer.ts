import {getAuthUser} from "./authReducer";
import {ActionsTypes, ThunkActionType} from "./reduxStore";
import {createSlice} from "@reduxjs/toolkit";

export interface InitialStateType {
    initialized: boolean
}

const initialState : InitialStateType = {
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

export const initializeApp = () : AppThunk => {
    return async (dispatch) => {
        await dispatch(getAuthUser());
        dispatch(initializedSuccess());
    }
}

export const { initializedSuccess } = appReducer.actions;
export default appReducer.reducer;