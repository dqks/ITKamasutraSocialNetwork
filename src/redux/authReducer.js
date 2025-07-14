import {authAPI, profileAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CURRENT_USER_IMAGE = "SET_CURRENT_USER_IMAGE";

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    userPhoto: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true};
        case SET_CURRENT_USER_IMAGE:
            return {...state, userPhoto: action.userPhoto};
        default:
            return {...state, userPhoto: action.userPhoto};
    }
}

export const setUserDataActionCreator = data => ({type: SET_USER_DATA, data});
export const setCurrentUserImageActionCreator = userPhoto => ({type: SET_CURRENT_USER_IMAGE, userPhoto});

export const getAuthUser = () => {
    return (dispatch) => {
        authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(data.data));
                    profileAPI.getUserProfile(data.data.id) // Get user image
                        .then((data) => {
                            if (data.photos.small) {
                                dispatch(setCurrentUserImageActionCreator(data.photos.small));
                            }
                        })
                }
            })
    }
}

export default authReducer;