import {usersAPI} from "../api/api";
import {changeObjectInArray} from "../utils/changeObjectInArray";

const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "users/FOLLOWING_IN_PROGRESS";
const SET_NEXT_CURRENT_PAGE = "users/SET_NEXT_CURRENT_PAGE";
const SET_PREVIOUS_CURRENT_PAGE = "users/SET_PREVIOUS_CURRENT_PAGE";
const SET_TOTAL_PAGE_AMOUNT = "users/SET_TOTAL_PAGE_AMOUNT";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    pageIncrement: 9,
    firstCurrentPage: 5500,
    lastCurrentPage: 5508,
    totalPageAmount: 1,
    _firstCurrentPage: 5500,
    _lastCurrentPage: 5508,
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: changeObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                users: changeObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {...state, users: [...action.users],}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        case SET_NEXT_CURRENT_PAGE: {
            if (state.lastCurrentPage === state.totalPageAmount) {
                return {...state}
            }

            let resultFirstCurrentPage = state.firstCurrentPage + state.pageIncrement;
            let resultLastCurrentPage = state.lastCurrentPage + state.pageIncrement;

            if (resultLastCurrentPage > state.totalPageAmount) {
                resultLastCurrentPage = state.totalPageAmount;
                return {
                    ...state,
                    firstCurrentPage: resultFirstCurrentPage,
                    lastCurrentPage: resultLastCurrentPage,
                };
            }

            return {
                ...state,
                firstCurrentPage: resultFirstCurrentPage,
                lastCurrentPage: resultLastCurrentPage,
                _firstCurrentPage: resultFirstCurrentPage,
                _lastCurrentPage: resultLastCurrentPage
            };
        }
        case SET_PREVIOUS_CURRENT_PAGE:
            let resultFirstCurrentPage = state.firstCurrentPage - state.pageIncrement;
            let resultLastCurrentPage = state.lastCurrentPage - state.pageIncrement;

            if (resultFirstCurrentPage < 1)
                resultFirstCurrentPage = 1;
            if (resultLastCurrentPage < 6)
                resultLastCurrentPage = 6;

            if (state.firstCurrentPage !==  state._firstCurrentPage && state.lastCurrentPage !== state._lastCurrentPage ) {
                return {
                    ...state,
                    firstCurrentPage: state._firstCurrentPage,
                    lastCurrentPage: state._lastCurrentPage,
                };
            }

            return {
                ...state,
                firstCurrentPage: resultFirstCurrentPage,
                lastCurrentPage: resultLastCurrentPage,
                _firstCurrentPage: resultFirstCurrentPage,
                _lastCurrentPage: resultLastCurrentPage
            };
        case SET_TOTAL_PAGE_AMOUNT:
            const totalPageAmount = Math.ceil(action.totalCount / state.pageSize);
            return {
                ...state,
                totalPageAmount: totalPageAmount
            };
        default:
            return state;
    }

}

//actions
export const follow = id => ({type: FOLLOW_USER, userId: id})
export const unfollow = id => ({type: UNFOLLOW_USER, userId: id})
export const setUsers = users => ({type: SET_USERS, users: users})
export const setCurrentPage = pageNumber => ({type: SET_CURRENT_PAGE, pageNumber: pageNumber});
export const setTotalCount = totalCount => ({type: SET_TOTAL_COUNT, totalCount: totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId})
export const setNextCurrentPage = () => ({type: SET_NEXT_CURRENT_PAGE})
export const setPreviousCurrentPage = () => ({type: SET_PREVIOUS_CURRENT_PAGE})
export const setTotalPageAmount = totalCount => ({type: SET_TOTAL_PAGE_AMOUNT, totalCount})

//thunks
export const requestUsers = (currentPage, pageSize) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        if (!data.error) {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
            dispatch(setTotalPageAmount(data.totalCount));
            dispatch(setCurrentPage(currentPage));
        } else {
            console.error("Unable to get users", data.error)
        }
    }
}

const followUnfollowUser = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    } else {
        console.error("Unable to follow user")
    }
    dispatch(toggleFollowingInProgress(false, userId));
}

export const followUser = userId => {
    return async dispatch => {
        followUnfollowUser(dispatch, userId, usersAPI.followUser.bind(usersAPI), follow);
    }
}

export const unfollowUser = userId => {
    return async dispatch => {
        followUnfollowUser(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollow);
    }
}

export default usersReducer;