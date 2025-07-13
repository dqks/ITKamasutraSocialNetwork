import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import {usersAPI} from "../../api/api";

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount);
            })
    }

    onPageChanged = (page) => {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(page, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
        this.props.setCurrentPage(page)
    }

    onFollowButtonClick = (id) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/` + id, {}, {
            withCredentials: true,
            headers: {
                "API-KEY": `619d1550-449e-46c7-9617-8ba8b6adc130`
            },
        })
            .then(response => {
                this.props.follow(id);
            })
    }

    onUnfollowButtonClick = (id) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + id, {
            withCredentials: true,
            headers: {
                "API-KEY": `619d1550-449e-46c7-9617-8ba8b6adc130`
            },
        })
            .then(response => {
                this.props.unfollow(id);
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} onFollowButtonClick={this.onFollowButtonClick}
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
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching
})(UserContainer)