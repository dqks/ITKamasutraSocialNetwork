import React from "react";
import {
    addLikeButtonActionCreator,
    addPostActionCreator,
    updateNewPostTextActionCreator
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let state = props.store.getState();

    let likeButtonClick = (id) => {
        props.store.dispatch(addLikeButtonActionCreator(id));
    }

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let updateNewPostText = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))
    }

    return (<MyPosts likeButtonClick={likeButtonClick} updateNewPostText={updateNewPostText}
                     addPost={addPost} posts={state.profilePage.postData} newPostText={state.profilePage.newPostText} />)
}

export default MyPostsContainer;