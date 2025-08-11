import {instance} from "./instance";

type GetCaptchaResponse = {
    url: string;
}

export const securityAPI = {
    async getCaptchaURL() {
        let response = await instance.get<GetCaptchaResponse>('/security/get-captcha-url');
        return response.data;
    },
}