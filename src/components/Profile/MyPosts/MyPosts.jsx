import classes from "./MyPosts.module.css"
import Post from "./Post/Post.jsx"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addLikeButtonActionCreator,
    addPostActionCreator,
    updateNewPostTextActionCreator
} from "../../../redux/profileReducer";

const MyPosts = () => {

    const posts = useSelector(state => state.profilePage.postData);
    const newPostText = useSelector(state => state.profilePage.newPostText);

    let dispatch = useDispatch();

    let updateNewPostText = (event) => {
        dispatch(updateNewPostTextActionCreator(event.target.value))
    }

    let addPost = () => {
        dispatch(addPostActionCreator())
    }

    let likeButtonClick = (id) => {
        dispatch(addLikeButtonActionCreator(id))
    }

    let postArr = posts.map(el => <Post key={el.id} likeButtonClick={likeButtonClick} message={el.message} likeCount={el.likeCount} id={el.id} />)

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input size={40} className={classes.postText} type={"text"} onChange={updateNewPostText}  value={newPostText}/>
                </div>

                <div>
                    <button className={classes.addPostButton} onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                { postArr }
            </div>
        </div>
    )
}

export default MyPosts;