import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_LIKE_BUTTON = "ADD-LIKE-BUTTON";
const SET_PROFILE = "SET_PROFILE";
const CHANGE_STATUS = "CHANGE_STATUS";

let initialState = {
    profileStatus: null,
    profile: null,
    postData: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 0},
        {id: 3, message: "It", likeCount: 0},
    ],
    newPostText: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            if (state.newPostText === "") {
                return state;
            }
            let newPost = {
                id: state.postData
                    [state.postData.length - 1].id + 1, message: state.newPostText, likeCount: 0
            };
            return {...state, newPostText: "", postData: [...state.postData, newPost]};
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.postText};
        }
        case ADD_LIKE_BUTTON: {
            return {
                ...state,
                postData: state.postData.map(el => {
                    if (el.id === action.postId) {
                        return {...el, likeCount: el.likeCount + 1};
                    }
                    return el;
                })
            };
        }
        case SET_PROFILE: {
            return {...state, profile: action.profile};
        }
        case CHANGE_STATUS: {
            return {...state, profileStatus: action.status}
        }
        default:
            return state
    }
}

//Action creators
export const addPostActionCreator = () => ({type: ADD_POST})
export const addLikeButtonActionCreator = postId => ({type: ADD_LIKE_BUTTON, postId})
export const updateNewPostTextActionCreator = postText => ({type: UPDATE_NEW_POST_TEXT, postText})
export const setProfileActionCreator = profile => ({type: SET_PROFILE, profile})
export const changeStatusActionCreator = status => ({type: CHANGE_STATUS, status})

//Thunks
export const getUserProfile = (userId) => {
    return dispatch => {
        profileAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setProfileActionCreator(data));
            })
    }
}

export const setProfileStatus = (statusText) => {
    return dispatch => {
        profileAPI.setProfileStatus(statusText)
            // .then(data => {
            //     dispatch(changeStatusActionCreator(statusText));
            // })
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