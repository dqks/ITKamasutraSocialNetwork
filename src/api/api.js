import {instance} from "./instance";


export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser(id) {
        return instance.post(`follow/` + id)
            .then(response => response.data)
    },

    unfollowUser(id) {
        return instance.delete(`follow/` + id)
            .then(response => response.data)
    }
}

export const authAPI = {
    checkAuth() {
        return instance.get(`auth/me`).then(response => response.data)
    },

    login(email, password, rememberMe, captcha = "") {
        return instance.post(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha
            })
    },

    logout() {
        return instance.post('auth/logout');
    },
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get('/security/get-captcha-url')
            .then(response => response.data);
    },
}