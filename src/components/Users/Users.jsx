import classes from './Users.module.css'
import React from "react";
import UserItem from "./UserItem/UserItem";

let Users = (props) => {
    if (props.users.length === 0) {
        console.log(props.users.length);
        props.setUsers([{
            id: "1",
            firstName: "Dmitry",
            lastName: "Kotovec",
            avatarUrl: "https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/358732453407.jpg",
            isFollowed: false,
            description: "I am looking for a job right now...",
            location: {country: "Belarus", city: "Minsk"}
        }, {
            id: "2",
            firstName: "Svetlana",
            lastName: "Darovana",
            avatarUrl: "https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/358732453407.jpg",
            isFollowed: false,
            description: "I am so pretty",
            location: {country: "Belarus", city: "Minsk"}
        }, {
            id: "3",
            firstName: "Sergei",
            lastName: "Sichev",
            avatarUrl: "https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/358732453407.jpg",
            isFollowed: true,
            description: "I like football",
            location: {country: "Ukraine", city: "Kiev"}
        }, {
            id: "4",
            firstName: "Andrew",
            lastName: "Tate",
            avatarUrl: "https://static.kinoafisha.info/k/persons/1080x1920/upload/persons/358732453407.jpg",
            isFollowed: true,
            description: "I am free to help you to create good video",
            location: {country: "United States", city: "Philadelphia"}
        }]);
    }

    let usersArr = props.users.map(el => <UserItem id={el.id} key={el.id} firstName={el.firstName}
        lastName={el.lastName} avatarUrl={el.avatarUrl} isFollowed={el.isFollowed} description={el.description}
    location={el.location} follow={props.follow} unfollow={props.unfollow} />)

    return (
        <div className={classes.body}>
            {usersArr}
        </div>
    )
}

export default Users;