import classes from './Users.module.css'
import React from "react";
import UserItem from "./UserItem/UserItem";
import axios from "axios";

class Users extends React.Component {
    getUsers = () => {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    this.props.setUsers(response.data.items);
                })
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        let usersArr = this.props.users.map(el => <UserItem id={el.id} key={el.id} name={el.name} photo={el.photos.small}
                                                               followed={el.followed} status={el.status}
                                                               follow={this.props.follow} unfollow={this.props.unfollow}/>)
        return (<div>
            <div className={classes.titleWrapper}>
                <h1>
                    Users
                </h1>
            </div>
            {usersArr.slice(0, this.props.showAmount)}
            <div className={classes.showMoreWrapper}>
                {usersArr.length > this.props.showAmount ?
                    <button onClick={this.props.showMore} className={classes.showMore}>Show more</button> : null}
            </div>
        </div>)
    }

}


export default Users;