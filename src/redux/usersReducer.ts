import {usersAPI} from "../api/usersAPI";
import {changeObjectInArray} from "../utils/changeObjectInArray";
import {ActionsTypes, RootState} from "./reduxStore";
import {PhotosType} from "../types/types";
import {ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";

const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "users/FOLLOWING_IN_PROGRESS";

export type User = {
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
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

let usersReducer = (state = initialState, action: UsersActionsTypes) => {
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

type UsersActionsTypes = ActionsTypes<typeof actions>

//actions
export const actions = {
      follow : (userId: number) => ({type: FOLLOW_USER, userId} as const),
      unfollow : (userId: number) => ({type: UNFOLLOW_USER, userId} as const),
      setUsers : (users: Array<User>) => ({type: SET_USERS, users} as const),
      setCurrentPage : (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const),
      setTotalCount : (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const),
      toggleIsFetching : (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
      toggleFollowingInProgress : (isFetching: boolean, userId: number) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId} as const)
}

type UsersAppThunk<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UsersActionsTypes
>

//thunks
export const requestUsers = (currentPage: number, pageSize: number): UsersAppThunk => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        try {
            const data = await usersAPI.getUsers(currentPage, pageSize);
            if (!data.error) {
                dispatch(actions.toggleIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalCount(data.totalCount));
                dispatch(actions.setCurrentPage(currentPage));
            } else {
                console.error("Unable to get users", data.error)
            }
        } catch (error) {
            console.error("Unable to get users", error)
        }
    }
}

const followUnfollowUser = async (dispatch: ThunkDispatch<RootState, unknown, UsersActionsTypes>,
                                  userId: number,
                                  apiMethod: any,
                                  actionCreator: (userId: number) => UsersActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    try {
        const data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            console.error("Unable to follow user")
        }
        dispatch(actions.toggleFollowingInProgress(false, userId));
    } catch (error) {
        console.error("Unable to follow user", error)
    }
}

export const followUser = (userId: number) : UsersAppThunk => {
    return async (dispatch) => {
        await followUnfollowUser(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.follow);
    }
}

export const unfollowUser = (userId: number) : UsersAppThunk => {
    return async (dispatch) => {
        await followUnfollowUser(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollow);
    }
}

export default usersReducer;