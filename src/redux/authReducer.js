const SET_USER_DATA = "SET_USER_DATA";
const SET_CURRENT_USER_IMAGE = "SET_CURRNET_USER_IMAGE";

let initialState = {
    userId: null,
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
            debugger
            return {...state, userPhoto: action.userPhoto};
        default:
            return {...state, userPhoto: action.userPhoto};
    }
}

export const setUserDataActionCreator = data => ({type: SET_USER_DATA, data});
export const setCurrentUserImageActionCreator = userPhoto => ({type: SET_CURRENT_USER_IMAGE, userPhoto});

export default authReducer;