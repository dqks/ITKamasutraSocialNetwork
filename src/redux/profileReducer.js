import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const ADD_LIKE_BUTTON = "ADD-LIKE-BUTTON";
const SET_PROFILE = "SET_PROFILE";
const CHANGE_STATUS = "CHANGE_STATUS";
const DELETE_POST = "DELETE_POST";

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
            return {...state,
                postData: state.postData.filter(el => el.id !== action.postId)};
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
export const getUserProfile = (userId) => {
    return dispatch => {
        profileAPI.getUserProfile(userId)
            .then(response => {
                if (response.status === 200) {
                    dispatch(setProfileActionCreator(response.data));
                }
            })
            .catch(error => {
                console.error("Unable to get user profile", error);
            })
    }
}

export const setProfileStatus = (statusText) => {
    return dispatch => {
        profileAPI.setProfileStatus(statusText)
            .then(() => {
                dispatch(changeStatusActionCreator(statusText));
            })
    }
}

export const getProfileStatus = (userId) => {
    return dispatch => {
        profileAPI.getProfileStatus(userId)
            .then(data => {
                dispatch(changeStatusActionCreator(data));
            })
    }
}


export default profileReducer;