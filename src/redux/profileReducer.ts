import {ActionsTypes, RootState} from "./reduxStore";
import {PhotosType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {ProfileDataInitialValues} from "../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm";

export type PostType = {
    id: number,
    message: string
    likeCount: number
}

export type ContactsType = {
    [key: string]: string
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string,
}

export type ProfileType = {
    userId: number
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    contacts: ContactsType
    photos: PhotosType
}

type InitialStateType = {
    profileStatus: string
    profile: ProfileType | null
    postData: Array<PostType>
}

let initialState: InitialStateType = {
    profileStatus: '',
    profile: null,
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
};

const profileReducer = createSlice({
    name: "profileReducer",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            const newPost = {
                id: state.postData[state.postData.length - 1].id + 1,
                message: action.payload,
                likeCount: 0
            };
            state.postData.push(newPost);
        },
        addLike: (state, action: PayloadAction<number>) => {
            const post = state.postData.find(post => post.id === action.payload);
            if (post) {
                post.likeCount++;
            }
        },
        setProfile: (state, action: PayloadAction<ProfileType | null>) => {
            state.profile = action.payload;
        },
        changeStatus: (state, action: PayloadAction<string>) => {
            state.profileStatus = action.payload;
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.postData.filter(el => el.id !== action.payload)
        },
        updateProfilePhoto: (state, action: PayloadAction<string | null>) => {
            if (state.profile) {
                state.profile.photos.small = action.payload;
                state.profile.photos.large = action.payload;
            }
        }
    }
})

type ProfileActionsTypes = ActionsTypes<typeof profileReducer.actions>

type ProfileThunkAction<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    ProfileActionsTypes
>

//Thunks
export const getUserProfile = (userId: number | null): ProfileThunkAction => {
    return async (dispatch) => {
        const response = await profileAPI.getUserProfile(userId);
        if (response.status === 200) {
            dispatch(setProfile(response.data));
        }
    }
}

export const setProfileStatus = (statusText: string): ProfileThunkAction => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.setProfileStatus(statusText);
            if (response.resultCode === 0) {
                dispatch(changeStatus(statusText));
            } else {
                console.error("Unable to change status", response.messages)
            }
        } catch (error) {
            //dispatch
            console.error("Unable to change status")
        }
    }
}

export const getProfileStatus = (userId: number): ProfileThunkAction => {
    return async (dispatch) => {
        const data = await profileAPI.getProfileStatus(userId)
        dispatch(changeStatus(data));
    }
}

export const setProfilePhoto = (photo: string): ProfileThunkAction => {
    return async (dispatch) => {
        const response = await profileAPI.setProfilePhoto(photo);
        if (response.resultCode === 0) {
            dispatch(updateProfilePhoto(response.data.photos.large));
        } else {
            console.error("Unable to change photo", response.messages)
        }
    }
}

export const saveProfileData = (data: ProfileDataInitialValues,
                                setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
                                setEditModeFalse: () => void): ProfileThunkAction => {
    return async (dispatch, getState) => {
        const payload = {
            fullName: data.fullName,
            lookingForAJob: data.lookingForAJob,
            lookingForAJobDescription: data.lookingForAJobDescription,
            aboutMe: data.aboutMe,
            contacts: {
                facebook: data.facebook,
                website: data.website,
                vk: data.vk,
                twitter: data.twitter,
                instagram: data.instagram,
                youtube: data.youtube,
                github: data.github,
                mainLink: data.mainLink,
            }
        } as ProfileType
        const response = await profileAPI.saveProfileData(payload);
        if (response.resultCode === 0) {
            const userId = getState().auth.id;
            dispatch(getUserProfile(userId));
            setEditModeFalse()
        } else {
            setFieldValue("errorMessage", response.messages.join(" "))
            console.error("Unable to change data", response.messages)
        }
    }
}

export const {addPost, addLike, deletePost, setProfile, updateProfilePhoto, changeStatus} = profileReducer.actions
export default profileReducer.reducer;