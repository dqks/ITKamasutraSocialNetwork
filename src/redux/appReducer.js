import {getAuthUser} from "./authReducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_INITIALIZED_SUCCESS"

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true};
        default:
            return {...state};
    }
}

export const setInitializedActionCreator = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return async dispatch => {
        const dispatchResult = await dispatch(getAuthUser());
        dispatch(setInitializedActionCreator());
    }
}

export default appReducer;