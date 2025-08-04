import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const DELETE_USER_DATA = "auth/DELETE_USER_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    userPhoto: null,
    captchaURL: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true};
        case DELETE_USER_DATA:
            return {...state, id: null, email: null, login: null, isAuth: false, userPhoto: null};
        case SET_CAPTCHA_URL:
            return {...state, captchaURL: action.url}
        default:
            return state;
    }
}

export const setUserDataActionCreator = data => ({type: SET_USER_DATA, data});
export const deleteUserDataActionCreator = () => ({type: DELETE_USER_DATA})
export const setCaptchaURL = (url) => ({type: SET_CAPTCHA_URL, url})

export const getAuthUser = () => {
    return async dispatch => {
        const data = await authAPI.checkAuth();
        if (data.resultCode === 0) {
            dispatch(setUserDataActionCreator(data.data));
        }
    }
}

export const loginUser = (email, password, rememberMe, setFieldValue, captchaValue = "") => {
    return async (dispatch, getState) => {
        const hasCaptcha = getState().auth.captchaURL;
        try {
            const response = await authAPI.login(email, password, rememberMe, captchaValue)

            if (response.data.resultCode === 0) {
                authAPI.checkAuth(response.data.data.userId)
                    .then(data => {
                        if (data.resultCode === 0) {
                            dispatch(setUserDataActionCreator(data.data));
                            if (hasCaptcha) dispatch(setCaptchaURL(null));
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
    return async dispatch => {
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
    return async dispatch => {
        const response = await securityAPI.getCaptchaURL();
        dispatch(setCaptchaURL(response.url));
    }
}

export default authReducer;