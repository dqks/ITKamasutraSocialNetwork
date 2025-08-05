import classes from "./Post.module.css"
import avatar from "../../../../assets/avatar.jpg"
import {memo} from "react";

const Post = (props) => {
    let likeButtonClick = () => {
        props.likeButtonClick(props.id)
    }
    return (
        <div className={classes.item}>
            <img src={avatar} alt="Logo"/>
            <div className={classes.info}>
                <p>{props.message}</p>
                <button onClick={likeButtonClick} className={classes.likeButton}>
                    <span>{props.likeCount}</span>
                    <span className={classes.likeIcon}>&#10084;</span>
                </button>
            </div>
        </div>
    )
}

export default Post;