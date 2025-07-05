import classes from "./MyPosts.module.css"
import Post from "./Post/Post.jsx"
import React from "react";

const MyPosts = (props) => {
    let updateNewPostText = (event) => {
        props.updateNewPostText(event.target.value);
    }

    let addPost = () => {
        props.addPost()
    }

    let likeButtonClick = (id) => {
        props.likeButtonClick(id);
    }

    let postArr = props.posts.map(el => <Post likeButtonClick={likeButtonClick} message={el.message} likeCount={el.likeCount} id={el.id} />)

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input size={40} className={classes.postText} type={"text"} onChange={updateNewPostText}  value={props.newPostText}/>
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