import axios from "axios";
import {setProfileActionCreator} from "../redux/profileReducer";

const instance =  axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": `0b4562cf-54b0-4945-b7d0-9b21f69fc8f6`
    }
});

export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser (id) {
        return instance.post(`follow/` + id)
            .then(response => response.data)
    },

    unfollowUser (id) {
        return instance.delete(`follow/` + id)
            .then(response => response.data)
    }
}

export const authAPI = {
    checkAuth () {
        return instance.get(`auth/me`).then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile (userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    }
}