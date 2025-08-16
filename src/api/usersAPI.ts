import {instance} from "./instance";
import {UserType} from "../redux/usersReducer";
import {ResponseType} from "./reponse-type";

export type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    async getUsers(currentPage: number,
        pageSize: number,
        nameFilter: string | null,
        friendFilter: boolean | null) {
        let response = await instance.get
            <GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${nameFilter}` + (friendFilter === null ? '' : `&friend=${friendFilter}`));
        return response.data;
    },

    async followUser(id: number) {
        let response = await instance.post<ResponseType>(`follow/` + id);
        return response.data;
    },

    async unfollowUser(id: number) {
        let response = await instance.delete<ResponseType>(`follow/` + id);
        return response.data;
    }
}