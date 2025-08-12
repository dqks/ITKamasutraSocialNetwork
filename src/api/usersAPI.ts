import {instance} from "./instance";
import {UserType} from "../redux/usersReducer";
import {ResultCodes} from "./result-codes";

type GetUsersResponse = {
        items: Array<UserType>
        totalCount: number
        error: string | null
}

type FollowUnFollowResponse = {
    resultCode: ResultCodes
    messages: string[]
    data: {}
}

export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        let response = await instance.get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },

    async followUser(id: number) {
        let response = await instance.post<FollowUnFollowResponse>(`follow/` + id);
        return response.data;
    },

    async unfollowUser(id: number) {
        let response = await instance.delete<FollowUnFollowResponse>(`follow/` + id);
        return response.data;
    }
}