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

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true,
        })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            })
    }

    onPageChanged = (page) => {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {
            withCredentials: true,
        })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
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
                console.log(response);
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