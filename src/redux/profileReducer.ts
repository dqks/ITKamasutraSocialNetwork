import {RootState} from "./reduxStore";
import {PhotosType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {ThunkAction} from "@reduxjs/toolkit";

const ADD_POST = "profile/ADD_POST";
const ADD_LIKE_BUTTON = "profile/ADD_LIKE_BUTTON";
const SET_PROFILE = "profile/SET_PROFILE";
const CHANGE_STATUS = "profile/CHANGE_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const UPDATE_PROFILE_PHOTO = "profile/UPDATE_PROFILE_PHOTO";

type PostType = {
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

const profileReducer = (state = initialState, action: ProfileActionsTypes)  => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postData[state.postData.length - 1].id + 1,
                message: action.postText,
                likeCount: 0
            };
            return {...state, postData: [...state.postData, newPost]};
        case ADD_LIKE_BUTTON:
            return {
                ...state,
                postData: state.postData.map(el => {
                    if (el.id === action.postId) {
                        return {...el, likeCount: el.likeCount + 1};
                    }
                    return el;
                })
            };
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case CHANGE_STATUS:
            return {...state, profileStatus: action.status}
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(el => el.id !== action.postId)
            };
        case UPDATE_PROFILE_PHOTO:
            debugger

            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        large: action.photoUrl,
                        small: action.photoUrl
                    }
                } as ProfileType
            }
        default:
            return state
    }
}

type ProfileActionsTypes = AddPostType | AddLikeButtonType | SetProfileType | ChangeStatusType | DeletePostType
    | UpdateProfilePhotoType

type AddPostType = {
    type: typeof ADD_POST
    postText: string
}

type AddLikeButtonType = {
    type: typeof ADD_LIKE_BUTTON
    postId: number
}

type SetProfileType = {
    type: typeof SET_PROFILE
    profile: ProfileType | null
}

type ChangeStatusType = {
    type: typeof CHANGE_STATUS
    status: string
}

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}

type UpdateProfilePhotoType = {
    type: typeof UPDATE_PROFILE_PHOTO
    photoUrl: string | null
}

//Action creators
export const addPostActionCreator = (postText: string)
    : AddPostType => ({type: ADD_POST, postText});
export const addLikeButtonActionCreator = (postId: number)
    : AddLikeButtonType => ({type: ADD_LIKE_BUTTON, postId});
export const setProfileActionCreator = (profile: ProfileType | null)
    : SetProfileType => ({type: SET_PROFILE, profile});
export const changeStatusActionCreator = (status: string)
    : ChangeStatusType => ({type: CHANGE_STATUS, status});
export const deletePost = (postId: number)
    : DeletePostType => ({type: DELETE_POST, postId})
export const updateProfilePhoto = (photoUrl: string | null)
    : UpdateProfilePhotoType => ({type: UPDATE_PROFILE_PHOTO, photoUrl})

type ProfileThunkAction<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    ProfileActionsTypes
>

//Thunks
export const getUserProfile = (userId: number | null) : ProfileThunkAction => {
    return async (dispatch) => {
        const response = await profileAPI.getUserProfile(userId);
        if (response.status === 200) {
            dispatch(setProfileActionCreator(response.data));
        }
    }
}

export const setProfileStatus = (statusText: string) : ProfileThunkAction => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.setProfileStatus(statusText);
            if (response.resultCode === 0) {
                dispatch(changeStatusActionCreator(statusText));
            } else {
                console.error("Unable to change status", response.messages)
            }
        } catch (error) {
            //dispatch
            console.error("Unable to change status")
        }
    }
}

export const getProfileStatus = (userId: number) : ProfileThunkAction => {
    return async (dispatch) => {
        const data = await profileAPI.getProfileStatus(userId)
        dispatch(changeStatusActionCreator(data));
    }
}

export const setProfilePhoto = (photo: string) : ProfileThunkAction => {
    return async (dispatch) => {
        const response = await profileAPI.setProfilePhoto(photo);
        if (response.resultCode === 0) {
            dispatch(updateProfilePhoto(response.data.photos.large));
        } else {
            console.error("Unable to change photo", response.messages)
        }
    }
}

export const saveProfileData = (data: any, setFieldValue: any, setEditModeFalse: any) : ProfileThunkAction => {
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

export default profileReducer;