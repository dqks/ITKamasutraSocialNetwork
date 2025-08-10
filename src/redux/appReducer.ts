import {getAuthUser} from "./authReducer";
import {RootState} from "./reduxStore";
import {ThunkAction} from "@reduxjs/toolkit";

const INITIALIZED_SUCCESS = "app/INITIALIZED_INITIALIZED_SUCCESS"

export interface InitialStateType {
    initialized: boolean
}

const initialState : InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action : AppActionsTypes) : InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true};
        default:
            return state;
    }
}

type AppActionsTypes = InitializedSuccessAction

type AppThunk<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActionsTypes
>

type InitializedSuccessAction = {
    type: typeof INITIALIZED_SUCCESS,
}

export const setInitialized = () : InitializedSuccessAction => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () : AppThunk => {
    return async (dispatch) => {
        await dispatch(getAuthUser());
        dispatch(setInitialized());
    }
}

export default appReducer;