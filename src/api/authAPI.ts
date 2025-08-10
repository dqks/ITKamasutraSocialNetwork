import {instance} from "./instance";
import {ResultCodeForCaptcha, ResultCodes} from "./result-codes";

type CheckAuthResponseType = {
    resultCode: ResultCodes
    messages: string[];
    data: {
        id: number
        email: string
        login: string
    }
}

type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: string[]
    data: {
        userId: number
    }
}

type LogoutResponseType = {
    resultCode: ResultCodes
    messages: string[]
    dataFieldErrors: string[]
    data: {}
}

export const authAPI = {
    async checkAuth() {
        let response = await instance.get<CheckAuthResponseType>('auth/me');
        return response.data;
    },

    async login(email: string, password: string, rememberMe: boolean, captcha = "") {
        const response = await instance.post<LoginResponseType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        });
        return response.data;
    },

    logout() {
        return instance.post<LogoutResponseType>('auth/logout');
    },
}