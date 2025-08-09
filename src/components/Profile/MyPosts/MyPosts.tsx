import classes from "./MyPosts.module.css"
import Post from "./Post/Post"
import React from "react";
import {addLikeButtonActionCreator,} from "../../../redux/profileReducer";
import PostForm from "./PostForm/PostForm";
import {getPostData} from "../../../redux/profileSelectors";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

interface MyPostProps {}

const MyPosts = ({} : MyPostProps) => {
    const posts = useAppSelector(getPostData);

    const dispatch = useAppDispatch();

    const likeButtonClick = (postId : number) => {
        dispatch(addLikeButtonActionCreator(postId))
    }

    let postArr = posts.map(el => <Post key={el.id} likeButtonClick={likeButtonClick} message={el.message}
                                        likeCount={el.likeCount} id={el.id}/>)

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <PostForm/>
            </div>
            <div className={classes.posts}>
                {postArr}
            </div>
        </div>
    )
}

export default React.memo(MyPosts);