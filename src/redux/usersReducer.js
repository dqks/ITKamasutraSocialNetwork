import {usersAPI} from "../api/api";
import {changeObjectInArray} from "../utils/changeObjectInArray";

const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "users/FOLLOWING_IN_PROGRESS";
const SET_FIRST_CURRENT_PAGE = "users/SET_FIRST_CURRENT_PAGE";
const SET_LAST_CURRENT_PAGE = "users/SET_LAST_CURRENT_PAGE";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    firstCurrentPage: 1,
    lastCurrentPage: 9,
    pageIncrement: 10,
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
        case SET_FIRST_CURRENT_PAGE:
            return {...state, firstCurrentPage: action.currentPage};
        case SET_LAST_CURRENT_PAGE:
            debugger
            return {...state, lastCurrentPage: action.currentPage};
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
export const setFirstCurrentPage = currentPage => ({type: SET_FIRST_CURRENT_PAGE, currentPage})
export const setLastCurrentPage = currentPage => ({type: SET_LAST_CURRENT_PAGE, currentPage})

//thunks
export const requestUsers = (currentPage, pageSize) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        if (!data.error) {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
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
        await followUnfollowUser(dispatch, userId, usersAPI.followUser.bind(usersAPI), follow);
    }
}

export const unfollowUser = userId => {
    return async dispatch => {
        await followUnfollowUser(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollow);
    }
}

export default usersReducer;