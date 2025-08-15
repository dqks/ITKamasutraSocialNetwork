import {RootState} from "./reduxStore";

export const getUsers = (state: RootState) => state.usersPage.users;


export const getTotalUsersCount = (state: RootState) => state.usersPage.totalUsersCount;


export const getPageSize = (state: RootState) => state.usersPage.pageSize;


export const getCurrentPage = (state: RootState) => state.usersPage.currentPage;


export const getIsFetching = (state: RootState) => state.usersPage.isFetching;


export const getFollowingInProgress = (state: RootState) => state.usersPage.followingInProgress;


export const getNameFilter = (state: RootState) => state.usersPage.filter.nameFilter;

export const getFriendFilter = (state: RootState) => state.usersPage.filter.friendFilter;
