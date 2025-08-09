import {instance} from "./instance";
import {ProfileType} from "../redux/profileReducer";
import {AxiosResponse} from "axios";

export const profileAPI = {
    getUserProfile(userId : number | null) : Promise<AxiosResponse<ProfileType>> {
        return instance.get(`profile/` + userId);
    },

    setProfileStatus(statusText : string) {
        return instance.put('profile/status', {status: statusText})
            .then(response => response.data)
    },

    getProfileStatus(userId : number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data);
    },

    setProfilePhoto(image : string) {
        let formData = new FormData();
        formData.append("image", image);
        return instance.post(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);

    },
    saveProfileData(profile : ProfileType) {
        return instance.put('/profile', profile)
            .then(response => response.data);
    }
}