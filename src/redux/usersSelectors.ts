import {RootState} from "./reduxStore";

export const getUsers = (state : RootState) => {
    return state.usersPage.users;
}

export const getTotalUsersCount = (state : RootState) => {
    return state.usersPage.totalUsersCount;
}

export const getPageSize = (state : RootState) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state : RootState) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state : RootState) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state : RootState) => {
    return state.usersPage.followingInProgress;
}

export const getPageIncrement = (state : RootState) => {
    return state.usersPage.pageIncrement;
}