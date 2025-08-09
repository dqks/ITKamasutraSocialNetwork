import {getAuthUser} from "./authReducer";
import {AppDispatch} from "./reduxStore";

const INITIALIZED_SUCCESS = "app/INITIALIZED_INITIALIZED_SUCCESS"

export interface InitialStateType {
    initialized: boolean
}

const initialState : InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action : any) : InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true};
        default:
            return state;
    }
}

type InitializedSuccessAction = {
    type: typeof INITIALIZED_SUCCESS,
}

export const setInitialized = () : InitializedSuccessAction => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return async (dispatch : AppDispatch) => {
        const dispatchResult = await dispatch(getAuthUser());
        dispatch(setInitialized());
    }
}

export default appReducer;