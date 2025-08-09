import classes from "./Post.module.css"
import avatar from "../../../../assets/avatar.jpg"

interface PostProps {
    likeButtonClick: Function
    message: string
    likeCount: number
    id: number
}

const Post = ({likeButtonClick, message, likeCount, id} : PostProps) => {
    let onLikeButtonClick = () => {
        likeButtonClick(id)
    }
    return (
        <div className={classes.item}>
            <img src={avatar} alt="Logo"/>
            <div className={classes.info}>
                <p>{message}</p>
                <button onClick={onLikeButtonClick} className={classes.likeButton}>
                    <span>{likeCount}</span>
                    <span className={classes.likeIcon}>&#10084;</span>
                </button>
            </div>
        </div>
    )
}

export default Post;