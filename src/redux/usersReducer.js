const FOLLOW_USER = "FOLLOW-USER"
const UNFOLLOW_USER = "UNFOLLOW-USER"
const SHOW_MORE = "SHOW-MORE"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            console.log(3232)

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

        case SHOW_MORE:
            return {...state, showAmount: state.showAmount + 4};

        case SET_USERS:
            return {...state, users: [...action.users]}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}

        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}

        default:
            return state;
    }

}

export const followActionCreator = id => ({type: FOLLOW_USER, userId: id})
export const unfollowActionCreator = id => ({type: UNFOLLOW_USER, userId: id})
export const showMoreActionCreator = () => ({type: SHOW_MORE})
export const setUsersActionCreator = users => ({type: SET_USERS, users: users})
export const setCurrentPageActionCreator = pageNumber => ({type: SET_CURRENT_PAGE, pageNumber:pageNumber});
export const setTotalCountActionCreator = totalCount => ({type: SET_TOTAL_COUNT, totalCount:totalCount});

export default usersReducer;