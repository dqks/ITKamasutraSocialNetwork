import {connect} from "react-redux";
import {followUser, requestUsers, unfollowUser} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        this.props.requestUsers(page, this.props.pageSize)
    }

    onFollowButtonClick = (id) => {
        this.props.followUser(id);
    }

    onUnfollowButtonClick = (id) => {
        this.props.unfollowUser(id);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users followingInProgress={this.props.followingInProgress} users={this.props.users}
                   onFollowButtonClick={this.onFollowButtonClick}
                   onUnfollowButtonClick={this.onUnfollowButtonClick} onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage} totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}/>
        </>
    }
}


// let mapStateToProps = state => {
//     return {
//         users: state.usersPage.users,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         pageSize: state.usersPage.pageSize,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

let mapStateToProps = state => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default connect(mapStateToProps, {
    followUser,
    unfollowUser,
    requestUsers
})(UserContainer)