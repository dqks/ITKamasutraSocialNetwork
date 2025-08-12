import {getAuthUser} from "./authReducer";
import {ActionsTypes, RootState} from "./reduxStore";
import {createSlice, ThunkAction} from "@reduxjs/toolkit";

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

type Actions = ActionsTypes<typeof appReducer.actions> // all action types

type AppThunk<ReturnType = Promise<void>> = ThunkAction< // creating type for thunks
    ReturnType,
    RootState,
    unknown,
    Actions
>

export const initializeApp = () : AppThunk => {
    return async (dispatch) => {
        await dispatch(getAuthUser());
        dispatch(initializedSuccess());
    }
}

export const { initializedSuccess } = appReducer.actions;
export default appReducer.reducer;