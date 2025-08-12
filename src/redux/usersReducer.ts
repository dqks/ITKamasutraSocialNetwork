import {usersAPI} from "../api/usersAPI";
import {changeObjectInArray} from "../utils/changeObjectInArray";
import {ActionsTypes, RootState, ThunkActionType} from "./reduxStore";
import {PhotosType} from "../types/types";
import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null
    photos: PhotosType
    status: string | null
    followed: boolean
}

type InitialStateType = {
    users: Array<UserType>
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

const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        followUser: (state, action: PayloadAction<number>) => {
            state.users = changeObjectInArray(state.users, action.payload, "id", {followed: true});
        },
        unfollowUser: (state, action: PayloadAction<number>) => {
            state.users = changeObjectInArray(state.users, action.payload, "id", {followed: false});
        },
        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.users = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        toggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        toggleFollowingInProgress: {
            reducer: (state, action : PayloadAction<{ isFetching : boolean, userId : number }>) => {
                state.followingInProgress = action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            },
            prepare: (isFetching : boolean, userId : number) => {
                debugger
                return { payload : { isFetching, userId } }
            }
        }

    }
})

type UsersActionsTypes = ActionsTypes<typeof usersReducer.actions>

type UsersAppThunk = ThunkActionType<UsersActionsTypes>

//thunks
export const requestUsers = (currentPage: number, pageSize: number): UsersAppThunk => {
    return async (dispatch) => {
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

export const { toggleIsFetching, toggleFollowingInProgress, followUser, setUsers, unfollowUser, setTotalCount, setCurrentPage } = usersReducer.actions
export default usersReducer.reducer;