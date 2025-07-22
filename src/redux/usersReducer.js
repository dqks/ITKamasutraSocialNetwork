import {usersAPI} from "../api/api";

const FOLLOW_USER = "FOLLOW-USER";
const UNFOLLOW_USER = "UNFOLLOW-USER";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: true};
                    }
                    return el;
                })
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: false};
                    }
                    return el;
                })
            };
        case SET_USERS:
            return {...state, users: [...action.users]}
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
            }
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

//thunks
export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            if (!data.error) {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount));
                dispatch(setCurrentPage(currentPage));
            }

        })
            .catch(error => {
                console.error("Unable to get users", error)
            })
    }
}

export const followUser = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, id));
        usersAPI.followUser(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(follow(id));
                }
                dispatch(toggleFollowingInProgress(false, id));
            })
            .catch(error => {
                dispatch(toggleFollowingInProgress(false, id));
                console.error("Failed to follow user", error)
            })
    }
}

export const unfollowUser = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, id));
        usersAPI.unfollowUser(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollow(id));
                }
                dispatch(toggleFollowingInProgress(false, id));
            })
            .catch((error) => {
                dispatch(toggleFollowingInProgress(false, id));
                console.error("Failed to unfollow user", error)
            })
    }
}

export default usersReducer;