import classes from "./Post.module.css"
import avatar from "../../../../assets/avatar.jpg"
import {memo} from "react";
import {useAppSelector} from "../../../../hooks/redux";
import {getAvatar} from "../../../../redux/profileSelectors";

interface PostProps {
    likeButtonClick: Function
    message: string
    likeCount: number
    id: number
}

const Post = ({likeButtonClick, message, likeCount, id} : PostProps) => {
    const profileAvatar = useAppSelector(getAvatar)

    let onLikeButtonClick = () => {
        likeButtonClick(id)
    }
    return (
        <div className={classes.item}>
            <img src={profileAvatar ? profileAvatar : avatar} alt="Logo"/>
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

export default memo(Post);