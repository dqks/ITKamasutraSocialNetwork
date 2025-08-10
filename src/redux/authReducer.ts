import {RootState} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ThunkAction} from "@reduxjs/toolkit";
import {ResultCodeForCaptcha, ResultCodes} from "../api/result-codes";

const SET_USER_DATA = "auth/SET_USER_DATA";
const DELETE_USER_DATA = "auth/DELETE_USER_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

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

const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true};
        case DELETE_USER_DATA:
            return {...state, id: null, email: null, login: null, isAuth: false};
        case SET_CAPTCHA_URL:
            return {...state, captchaUrl: action.url}
        default:
            return state;
    }
}

type AuthActionsTypes = SetUserDataType | DeleteUserDataType | SetCaptchaDataType

type UserDataType = {
    id: number,
    login: string,
    email: string
}

export type SetUserDataType = {
    type: typeof SET_USER_DATA
    data: UserDataType
}

type DeleteUserDataType = {
    type: typeof DELETE_USER_DATA
}

type SetCaptchaDataType = {
    type: typeof SET_CAPTCHA_URL
    url: string
}

export const setUserDataActionCreator = (data: UserDataType)
    : SetUserDataType => ({type: SET_USER_DATA, data});
export const deleteUserDataActionCreator = ()
    : DeleteUserDataType => ({type: DELETE_USER_DATA})
export const setCaptchaURL = (url: string)
    : SetCaptchaDataType => ({type: SET_CAPTCHA_URL, url})

type AuthThunkAction<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AuthActionsTypes
>

export const getAuthUser = () : AuthThunkAction => {
    return async (dispatch) => {
        const data = await authAPI.checkAuth();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setUserDataActionCreator(data.data));
        }
    }
}

export const loginUser = (email: string,
                          password: string,
                          rememberMe: boolean,
                          setFieldValue: Function,
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
                            dispatch(setUserDataActionCreator(data.data));
                            if (hasCaptcha) dispatch(setCaptchaURL(""));
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
                dispatch(deleteUserDataActionCreator())
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
        dispatch(setCaptchaURL(response.url));
    }
}

export default authReducer;