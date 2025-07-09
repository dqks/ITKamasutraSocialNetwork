import {connect} from "react-redux";
import Users from "./Users";
import {
    followActionCreator, setCurrentPageActionCreator, setTotalCountActionCreator,
    setUsersActionCreator,
    showMoreActionCreator,
    unfollowActionCreator
} from "../../redux/usersReducer";

let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = dispatch => {
    return {
        follow: id => dispatch(followActionCreator(id)),
        unfollow: id => dispatch(unfollowActionCreator(id)),
        showMore: () => dispatch(showMoreActionCreator()),
        setUsers: (users) => dispatch(setUsersActionCreator(users)),
        setCurrentPage: (pageNumber) => dispatch(setCurrentPageActionCreator(pageNumber)),
        setTotalCount: (totalCount) => dispatch(setTotalCountActionCreator(totalCount))
    }
}


let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer