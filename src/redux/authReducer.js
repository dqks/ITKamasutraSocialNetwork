import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const DELETE_USER_DATA = "DELETE_USER_DATA";
// const SET_CURRENT_USER_IMAGE = "SET_CURRENT_USER_IMAGE";

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
        // case SET_CURRENT_USER_IMAGE:
        //     return {...state, userPhoto: action.userPhoto};
        case DELETE_USER_DATA: {
            return {...state, id: null, email: null, login: null, isAuth: false, userPhoto: null};
        }
        default:
            return {...state, userPhoto: action.userPhoto};
    }
}

export const setUserDataActionCreator = data => ({type: SET_USER_DATA, data});
export const deleteUserDataActionCreator = () => ({type: DELETE_USER_DATA})
// export const setCurrentUserImageActionCreator = userPhoto => ({type: SET_CURRENT_USER_IMAGE, userPhoto});
// profileAPI.getUserProfile(data.data.id) // Get user image
//     .then((data) => {
//         if (data.photos.small) {
//             dispatch(setCurrentUserImageActionCreator(data.photos.small));
//         }
//     })


export const getAuthUser = () => {
    return (dispatch) => {
        return authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserDataActionCreator(data.data));
                }
            })
    }
}

export const loginUser = (email, password, rememberMe, setFieldValue) => {
    return dispatch => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    authAPI.checkAuth(response.data.data.userId)
                        .then(data => {
                            if (data.resultCode === 0) {
                                dispatch(setUserDataActionCreator(data.data));
                            }
                        })
                } else {
                    setFieldValue("generalError", response.data.messages.join(" "))
                    console.error("Unable to log in", response.data.messages);
                }
            })
            .catch(error => {
                console.error("Unable to log in", error);
            })
    }
}

export const logoutUser = () => {
    return dispatch => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(deleteUserDataActionCreator())
                } else {
                    console.error("Unable to log out", response.data.messages);
                }
            })
            .catch(error => {
                console.error("Unable to log out", error)
            })
    }
}

export default authReducer;