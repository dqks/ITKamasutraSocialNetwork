import {connect} from "react-redux";
import {followUser, getUsers, unfollowUser} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader";

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        this.props.getUsers(page, this.props.pageSize)
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


let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps, {
    followUser,
    unfollowUser,
    getUsers
})(UserContainer)