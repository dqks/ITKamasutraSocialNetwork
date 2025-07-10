import {connect} from "react-redux";
import {
    followActionCreator, setCurrentPageActionCreator, setTotalCountActionCreator,
    setUsersActionCreator, toggleIsFetchingActionCreator ,
    unfollowActionCreator
} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../Common/Preloader";

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            })
    }

    onPageChanged = (page) => {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            })
        this.props.setCurrentPage(page)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users users={this.props.users} follow={this.props.follow}
                        unfollow={this.props.unfollow} onPageChanged={this.onPageChanged}
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

let mapDispatchToProps = dispatch => {
    return {
        follow: id => dispatch(followActionCreator(id)),
        unfollow: id => dispatch(unfollowActionCreator(id)),
        setUsers: users => dispatch(setUsersActionCreator(users)),
        setCurrentPage: pageNumber => dispatch(setCurrentPageActionCreator(pageNumber)),
        setTotalCount: totalCount => dispatch(setTotalCountActionCreator(totalCount)),
        toggleIsFetching: isFetching => dispatch(toggleIsFetchingActionCreator(isFetching))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)