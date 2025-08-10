import {instance} from "./instance";

export const securityAPI = {
    getCaptchaURL() {
        return instance.get('/security/get-captcha-url')
            .then(response => response.data);
    },
}