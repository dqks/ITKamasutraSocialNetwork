import {profileAPI} from "../api/api";
import {AppDispatch, RootState} from "./reduxStore";

const ADD_POST = "profile/ADD_POST";
const ADD_LIKE_BUTTON = "profile/ADD_LIKE_BUTTON";
const SET_PROFILE = "profile/SET_PROFILE";
const CHANGE_STATUS = "profile/CHANGE_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const UPDATE_PROFILE_PHOTO = "profile/UPDATE_PROFILE_PHOTO";

type Post = {
    id: number,
    message: string
    likeCount: number
}

type Profile = {
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string,
    }
    photos : {
        small: string
        large: string
    }
}

type InitialStateType = {
    profileStatus: string
    profile: Profile
    postData: Array<Post>
}

let initialState: InitialStateType = {
    profileStatus: '',
    profile: {
        fullName: "",
        lookingForAJob: false,
        lookingForAJobDescription: "",
        aboutMe: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: '',
            instagram: '',
            youtube: "",
            github: "",
            mainLink: "",
        },
        photos : {
            small: "",
            large: ""
        }
    },
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
};

const profileReducer = (state = initialState, action: any) => {
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
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        large: action.photoURL,
                        small: action.photoURL
                    }
                }
            }
        default:
            return state
    }
}

//Action creators
export const addPostActionCreator = (postText: string) => ({type: ADD_POST, postText});
export const addLikeButtonActionCreator = (postId: number) => ({type: ADD_LIKE_BUTTON, postId});
export const setProfileActionCreator = (profile: Profile) => ({type: SET_PROFILE, profile});
export const changeStatusActionCreator = (status : string) => ({type: CHANGE_STATUS, status});
export const deletePost = (postId : number) => ({type: DELETE_POST, postId})
export const updateProfilePhoto = (photoURL : string) => ({type: UPDATE_PROFILE_PHOTO, photoURL})

//Thunks
export const getUserProfile = (userId : number | null) => {
    return async (dispatch : AppDispatch) => {
        const response = await profileAPI.getUserProfile(userId);
        if (response.status === 200) {
            dispatch(setProfileActionCreator(response.data));
        }
    }
}

export const setProfileStatus = (statusText : string) => {
    return async (dispatch : AppDispatch) => {
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

export const getProfileStatus = (userId : number) => {
    return async (dispatch : AppDispatch) => {
        const data = await profileAPI.getProfileStatus(userId)
        dispatch(changeStatusActionCreator(data));
    }
}

export const setProfilePhoto = (photo : string) => {
    return async (dispatch : AppDispatch) => {
        const response = await profileAPI.setProfilePhoto(photo);
        if (response.resultCode === 0) {
            dispatch(updateProfilePhoto(response.data.photos.large));
        } else {
            console.error("Unable to change photo", response.messages)
        }
    }
}

export const saveProfileData = (data : any, setFieldValue : any, setEditModeFalse : any) => {
    return async (dispatch : AppDispatch, getState : () => RootState) => {
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
        }
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