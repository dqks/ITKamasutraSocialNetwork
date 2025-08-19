import {RootState} from "./reduxStore";

export const getAuthUserId = (state : RootState) => state.auth.id;

export const getIsAuth = (state : RootState) => state.auth.isAuth;

export const getLogin = (state : RootState) => state.auth.login;

export const getCaptchaURL = (state : RootState) => state.auth.captchaUrl;

export const getAvatarUrl = (state : RootState) => state.auth.avatarUrl;