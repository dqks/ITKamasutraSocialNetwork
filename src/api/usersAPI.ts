import {instance} from "./instance";


export const usersAPI = {
    getUsers(currentPage : number, pageSize : number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser(id : number) {
        return instance.post(`follow/` + id)
            .then(response => response.data)
    },

    unfollowUser(id : number) {
        return instance.delete(`follow/` + id)
            .then(response => response.data)
    }
}