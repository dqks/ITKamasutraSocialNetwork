import {usersAPI} from "../api/api";
import {changeObjectInArray} from "../utils/changeObjectInArray";
import {AppDispatch} from "./reduxStore";
import {PhotosType} from "../types/types";

const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "users/FOLLOWING_IN_PROGRESS";

type User = {
    name: string,
    id: number,
    uniqueUrlName: null
    photos: PhotosType
    status: string | null
    followed: boolean
}

type InitialStateType = {
    users: Array<User>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    firstCurrentPage: number
    lastCurrentPage: number
    pageIncrement: number
}

let initialState : InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    firstCurrentPage: 1,
    lastCurrentPage: 9,
    pageIncrement: 9,
};

let usersReducer = (state = initialState, action : any) => {
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
        default:
            return state;
    }
}

type FollowType = {
    type: typeof FOLLOW_USER
    userId: number
}

type UnfollowType = {
    type: typeof UNFOLLOW_USER
    userId: number
}

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<User>
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}

type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ToggleFollowingInProgressType = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}

//actions
export const follow = (userId: number)
    : FollowType => ({type: FOLLOW_USER, userId})
export const unfollow = (userId : number)
    : UnfollowType => ({type: UNFOLLOW_USER, userId})
export const setUsers = (users: Array<User>)
    : SetUsersType => ({type: SET_USERS, users})
export const setCurrentPage = (pageNumber : number)
    : SetCurrentPageType => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalCount = (totalCount : number)
    : SetTotalCountType => ({type: SET_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching : boolean)
    : ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching : boolean, userId : number)
    : ToggleFollowingInProgressType => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId})

//thunks
export const requestUsers = (currentPage : number, pageSize : number) => {
    return async (dispatch : AppDispatch) => {
        dispatch(toggleIsFetching(true));
        try {
            const data = await usersAPI.getUsers(currentPage, pageSize);
            if (!data.error) {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount));
                dispatch(setCurrentPage(currentPage));
            } else {
                console.error("Unable to get users", data.error)
            }
        } catch (error) {
            console.error("Unable to get users", error)
        }
    }
}

const followUnfollowUser = async (dispatch : AppDispatch, userId : number, apiMethod : Function, actionCreator : any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    try {
        const data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            console.error("Unable to follow user")
        }
        dispatch(toggleFollowingInProgress(false, userId));
    } catch (error) {
        console.error("Unable to follow user", error)
    }
}

export const followUser = (userId : number) => {
    return async (dispatch : AppDispatch) => {
        await followUnfollowUser(dispatch, userId, usersAPI.followUser.bind(usersAPI), follow);
    }
}

export const unfollowUser = (userId : number) => {
    return async (dispatch : AppDispatch) => {
        await followUnfollowUser(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollow);
    }
}

export default usersReducer;