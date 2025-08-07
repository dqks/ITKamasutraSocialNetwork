import {authAPI, securityAPI} from "../api/api";
import {AppDispatch, RootState} from "./reduxStore";

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

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type UserDataType = {
    id: number,
    login: string,
    email: string
}

type SetUserDataType = {
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

export const getAuthUser = () => {
    return async (dispatch: AppDispatch) => {
        const data = await authAPI.checkAuth();
        if (data.resultCode === 0) {
            dispatch(setUserDataActionCreator(data.data));
        }
    }
}

export const loginUser = (email: string, password: string, rememberMe: boolean, setFieldValue: any, captchaValue = "") => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const hasCaptcha = getState().auth.captchaUrl;
        try {
            const response = await authAPI.login(email, password, rememberMe, captchaValue)

            if (response.data.resultCode === 0) {
                authAPI.checkAuth()
                    .then(data => {
                        if (data.resultCode === 0) {
                            dispatch(setUserDataActionCreator(data.data));
                            if (hasCaptcha) dispatch(setCaptchaURL(""));
                        }
                    })
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaURL());
                }
                setFieldValue("generalError", response.data.messages.join(" "))
                console.error("Unable to log in", response.data.messages);
            }
        } catch (error) {
            console.error("Unable to log in", error);
        }
    }
}

export const logoutUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.logout();
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

export const getCaptchaURL = () => {
    return async (dispatch: AppDispatch) => {
        const response = await securityAPI.getCaptchaURL();
        dispatch(setCaptchaURL(response.url));
    }
}

export default authReducer;