import {connect} from "react-redux";
import Users from "./Users";
import {
    followActionCreator,
    setUsersActionCreator,
    showMoreActionCreator,
    unfollowActionCreator
} from "../../redux/usersReducer";

let mapStateToProps = state => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = dispatch => {
    return {
        follow: id => dispatch(followActionCreator(id)),
        unfollow: id => dispatch(unfollowActionCreator(id)),
        showMore: () => dispatch(showMoreActionCreator()),
        setUsers: (users) => dispatch(setUsersActionCreator(users))
    }
}


let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer