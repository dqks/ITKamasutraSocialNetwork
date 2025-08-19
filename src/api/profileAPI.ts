import {instance} from "./instance";
import {ProfileType} from "../redux/profileReducer";
import {PhotosType} from "../types/types";
import {ResponseType} from "./reponse-type";

type SetProfileStatusResponse = ResponseType<string>

type SetProfilePhotoResponse = ResponseType<{photos: PhotosType}>

type SetProfileDataResponse = ResponseType<ProfileType>

export const profileAPI = {
    getUserProfile(userId : number | null) {
        return instance.get<ProfileType>(`profile/` + userId);
    },

    async setProfileStatus(statusText: string) {
        let response = await instance.put<SetProfileStatusResponse>('profile/status', {status: statusText});
        return response.data;
    },

    async getProfileStatus(userId: number) {
        let response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },

    async setProfilePhoto(image: string) {
        let formData = new FormData();
        formData.append("image", image);
        let response = await instance.post<SetProfilePhotoResponse>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async saveProfileData(profile: ProfileType) {
        let response = await instance.put<SetProfileDataResponse>('/profile', profile);
        return response.data;
    }
}