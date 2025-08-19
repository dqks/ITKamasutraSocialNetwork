import {RootState} from "./reduxStore";

export const getProfile = (state: RootState) => state.profilePage.profile;

export const getProfileStatus = (state: RootState) => state.profilePage.profileStatus;

export const getPostData = (state: RootState) => state.profilePage.postData;

export const getAvatar = (state: RootState) => {
    if (state.profilePage.profile !== null) {
        return state.profilePage.profile.photos.small
    }
    return "";
}