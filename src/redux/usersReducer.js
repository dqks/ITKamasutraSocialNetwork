const FOLLOW_USER = "FOLLOW-USER"
const UNFOLLOW_USER = "UNFOLLOW-USER"
const SHOW_MORE = "SHOW-MORE"
const SET_USERS = "SET-USERS"

let initialState = {
    users: [],
    showAmount: 4
};

let usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, isFollowed: true};
                    }
                    return el;
                })
            };
        case UNFOLLOW_USER:
            return {

                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, isFollowed: false};
                    }
                    return el;
                })
            };

        case SHOW_MORE:
            return {...state, showAmount: state.showAmount + 4};

        case SET_USERS:
            return {...state, users: [...action.users]}

        default:
            return state;
    }

}

export const followActionCreator = (id) => ({type: FOLLOW_USER, userId: id})
export const unfollowActionCreator = (id) => ({type: UNFOLLOW_USER, userId: id})
export const showMoreActionCreator = () => ({type: SHOW_MORE})
export const setUsersActionCreator = (users) => ({type: SET_USERS, users: users})

export default usersReducer;