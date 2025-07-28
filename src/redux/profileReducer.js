import {profileAPI} from "../api/api";

const ADD_POST = "profile/ADD_POST";
const ADD_LIKE_BUTTON = "profile/ADD_LIKE_BUTTON";
const SET_PROFILE = "profile/SET_PROFILE";
const CHANGE_STATUS = "profile/CHANGE_STATUS";
const DELETE_POST = "profile/DELETE_POST";

let initialState = {
    profileStatus: null,
    profile: null,
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
};

const profileReducer = (state = initialState, action) => {
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
        default:
            return state
    }
}

//Action creators
export const addPostActionCreator = postText => ({type: ADD_POST, postText});
export const addLikeButtonActionCreator = postId => ({type: ADD_LIKE_BUTTON, postId});
export const setProfileActionCreator = profile => ({type: SET_PROFILE, profile});
export const changeStatusActionCreator = status => ({type: CHANGE_STATUS, status});
export const deletePost = postId => ({type: DELETE_POST, postId})

//Thunks
export const getUserProfile = userId => {
    return async dispatch => {
        const response = await profileAPI.getUserProfile(userId);
        if (response.status === 200) {
            dispatch(setProfileActionCreator(response.data));
        }
    }
}

export const setProfileStatus = statusText => {
    return async dispatch => {
        const response = await profileAPI.setProfileStatus(statusText);
        debugger;
        if (response.resultCode === 0) {
            dispatch(changeStatusActionCreator(statusText));
        } else {
            console.error("Unable to change status", response.messages)
        }
    }
}

export const getProfileStatus = userId => {
    return async dispatch => {
        const data = await profileAPI.getProfileStatus(userId)
        dispatch(changeStatusActionCreator(data));
    }
}

export default profileReducer;