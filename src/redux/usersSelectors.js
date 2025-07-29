import {createSelector} from "@reduxjs/toolkit";

export const getUsers = state => {
    return state.usersPage.users;
}

export const getFilteredUsers = createSelector(getUsers, (users) => {
    return users.filter(user => true);
});

export const getTotalUsersCount = state => {
    return state.usersPage.totalUsersCount;
}

export const getPageSize = state => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = state => {
    return state.usersPage.currentPage;
}

export const getIsFetching = state => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress;
}

export const getFirstCurrentPage = state => {
    return state.usersPage.firstCurrentPage;
}

export const getLastCurrentPage = state => {
    return state.usersPage.lastCurrentPage;
}