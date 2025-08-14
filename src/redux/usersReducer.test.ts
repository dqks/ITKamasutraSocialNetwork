import usersReducer, {followUser, unfollowUser, UsersInitialStateType} from "./usersReducer";

let state: UsersInitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                name: "dqks",
                id: 1,
                uniqueUrlName: null,
                photos: {
                    large: "bigPhoto",
                    small: "smallPhoto"
                },
                status: "status",
                followed: false
            },
            {
                name: "edmon",
                id: 2,
                uniqueUrlName: null,
                photos: {
                    large: "bigPhoto",
                    small: "smallPhoto"
                },
                status: "status",
                followed: true
            },
            {
                name: "sasha",
                id: 3,
                uniqueUrlName: null,
                photos: {
                    large: "bigPhoto",
                    small: "smallPhoto"
                },
                status: "status",
                followed: false
            },
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        searchUserFilter: "",
        followingInProgress: [],
    }
})

it("user should be followed", () => {
    let action = followUser(1)
    let newState = usersReducer(state, action)
    expect(newState.users[0].followed).toBe(true)
})

it("user should be unfollowed", () => {
    let action = unfollowUser(2)
    let newState = usersReducer(state, action)
    expect(newState.users[1].followed).toBe(false)
})