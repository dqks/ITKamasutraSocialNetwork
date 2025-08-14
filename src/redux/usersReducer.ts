import {usersAPI} from "../api/usersAPI";
import {changeObjectInArray} from "../utils/changeObjectInArray";
import {ActionsTypes, RootState, ThunkActionType} from "./reduxStore";
import {PhotosType} from "../types/types";
import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string | null
    photos: PhotosType
    status: string | null
    followed: boolean
}

export type UsersInitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    searchUserFilter: string
    followingInProgress: Array<number>
}

let initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    searchUserFilter: "",
    followingInProgress: [],
};

const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        followUser: (state,
            action: PayloadAction<number>) => {
            state.users = changeObjectInArray(state.users, action.payload, "id", {followed: true});
        },
        unfollowUser: (state,
            action: PayloadAction<number>) => {
            state.users = changeObjectInArray(state.users, action.payload, "id", {followed: false});
        },
        setUsers: (state,
            action: PayloadAction<UserType[]>) => {
            state.users = action.payload;
        },
        setCurrentPage: (state,
            action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalCount: (state,
            action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        toggleIsFetching: (state,
            action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        toggleFollowingInProgress: {
            reducer: (state,
                action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
                state.followingInProgress = action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            },
            prepare: (isFetching: boolean,
                userId: number) => {
                return {payload: {isFetching, userId}}
            }
        },
        setUserFilter: (state, action : PayloadAction<string>) => {
            state.searchUserFilter = action.payload;
        }
    }
})

type UsersActionsTypes = ActionsTypes<typeof usersReducer.actions>

type UsersAppThunk = ThunkActionType<UsersActionsTypes>

//thunks
export const requestUsers = (currentPage: number,
    pageSize: number,
    searchUserFilter = ""): UsersAppThunk => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        try {
            const data = await usersAPI.getUsers(currentPage, pageSize, searchUserFilter);
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

const _followUnfollowUser = async (dispatch: ThunkDispatch<RootState, unknown, UsersActionsTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => UsersActionsTypes) => {
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

export const followUserThunk = (userId: number): UsersAppThunk => {
    return async (dispatch) => {
        await _followUnfollowUser(dispatch, userId, usersAPI.followUser.bind(usersAPI), followUser);
    }
}

export const unfollowUserThunk = (userId: number): UsersAppThunk => {
    return async (dispatch) => {
        await _followUnfollowUser(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowUser);
    }
}

export const {
    toggleIsFetching,
    toggleFollowingInProgress,
    followUser,
    setUsers,
    unfollowUser,
    setTotalCount,
    setCurrentPage,
    setUserFilter
} = usersReducer.actions
export default usersReducer.reducer;