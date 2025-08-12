import {ActionsTypes, ThunkActionType} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResultCodeForCaptcha, ResultCodes} from "../api/result-codes";

type InitialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        setUserData: (state, action : PayloadAction<{ id: number, email: string, login: string }>) => {
            state.isAuth = true;
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
        },
        deleteUserData: (state) => {
            state.isAuth = false;
            state.id = null
            state.email = null
            state.login = null
        },
        setCaptchaUrl: (state, action: PayloadAction<string>) => {
            state.captchaUrl = action.payload
        }
    }
})
type AuthActionsTypes = ActionsTypes<typeof authReducer.actions>

type AuthThunkAction = ThunkActionType<AuthActionsTypes>

export const getAuthUser = () : AuthThunkAction => {
    return async (dispatch) => {
        const data = await authAPI.checkAuth();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setUserData(data.data));
        }
    }
}

export const loginUser = (email: string,
                          password: string,
                          rememberMe: boolean,
                          setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
                          captchaValue = "") : AuthThunkAction => {
    return async (dispatch, getState) => {
        const hasCaptcha = getState().auth.captchaUrl;
        try {
            const data = await authAPI.login(email,
                password,
                rememberMe,
                captchaValue)

            if (data.resultCode === ResultCodes.Success) {
                authAPI.checkAuth()
                    .then(data => {
                        if (data.resultCode === ResultCodes.Success) {
                            dispatch(setUserData(data.data));
                            if (hasCaptcha) dispatch(setCaptchaUrl(""));
                        }
                    })
            } else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaURL());
                }
                setFieldValue("generalError", data.messages.join(" "))
                console.error("Unable to log in", data.messages);
            }
        } catch (error) {
            console.error("Unable to log in", error);
        }
    }
}

export const logoutUser = () : AuthThunkAction => {
    return async (dispatch) => {
        try {
            const response = await authAPI.logout();
            debugger
            if (response.data.resultCode === 0) {
                dispatch(deleteUserData())
            } else {
                console.error("Unable to log out", response.data.messages);
            }
        } catch (error) {
            console.error("Unable to log out", error);
        }
    }
}

export const getCaptchaURL = () : AuthThunkAction => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaURL();
        dispatch(setCaptchaUrl(response.url));
    }
}

export const {setUserData, deleteUserData, setCaptchaUrl} = authReducer.actions;
export default authReducer.reducer;