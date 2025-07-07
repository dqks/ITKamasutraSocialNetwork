import classes from './Users.module.css'
import React from "react";

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


    return <div>
        {props.users.map(u => <div key={u.id}>

                     <span>
                        <div>
                            <img className={classes.avatar} src={u.avatarUrl} alt=""/>
                        </div>
                        <div>
                            {u.isFollowed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                                <button onClick={() => props.follow(u.id)}>Follow</button>}
                        </div>
                     </span>

            <span>
                        <span>
                            <div>{u.firstName + " " + u.lastName}</div>
                            <div>{u.description}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                     </span>

        </div>)}


    </div>
}

export default Users;