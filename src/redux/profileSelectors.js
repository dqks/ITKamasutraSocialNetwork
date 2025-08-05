import {createSelector} from "@reduxjs/toolkit";

export const getProfile = state => state.profilePage.profile;

// export const getProfileMemo = createSelector(getProfile, (profile) => {
//     return profile;
// })

export const getProfileStatus = state => state.profilePage.profileStatus;

export const getPostData = state => state.profilePage.postData;