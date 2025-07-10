import {connect} from "react-redux";
import {
    followActionCreator, setCurrentPageActionCreator, setTotalCountActionCreator,
    setUsersActionCreator,
    showMoreActionCreator,
    unfollowActionCreator
} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";
import Users from "./Users";

class UserContainer extends React.Component {
    getUsers = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            })
    }

    componentDidMount() {
        this.getUsers();
    }

    onPageChanged = (page) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
        this.props.setCurrentPage(page)
    }

    render() {
        return <Users users={this.props.users} follow={this.props.follow}
                      unfollow={this.props.unfollow} onPageChanged={this.onPageChanged}
                      currentPage={this.props.currentPage} totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}/>
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)