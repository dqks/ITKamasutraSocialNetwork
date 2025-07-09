import classes from './Users.module.css'
import React from "react";
import UserItem from "./UserItem/UserItem";
import axios from "axios";

class Users extends React.Component {
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
                this.props.setUsers(response.data.items);})
        this.props.setCurrentPage(page)
    }

    render() {

        let pagesCount =  Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = []
        for (let i = 1; i <= 9; i++) {
            pages.push(i);
        }

        let usersArr = this.props.users.map(el => <UserItem id={el.id} key={el.id} name={el.name} photo={el.photos.small}
                                                               followed={el.followed} status={el.status}
                                                               follow={this.props.follow} unfollow={this.props.unfollow}/>)
        return (<div>
            {pages.map(page =>
                <span onClick={() => this.onPageChanged(page)} className={this.props.currentPage === page && classes.selectedPage}>{page}</span>)}
            <div className={classes.titleWrapper}>
                <h1>
                    Users
                </h1>
            </div>
            {usersArr}
            <div className={classes.showMoreWrapper}>
                {usersArr.length > this.props.showAmount ?
                    <button onClick={this.props.showMore} className={classes.showMore}>Show more</button> : null}
            </div>
        </div>)
    }
}

export default Users;