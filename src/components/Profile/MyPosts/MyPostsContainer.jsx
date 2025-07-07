import {
    addLikeButtonActionCreator,
    addPostActionCreator,
    updateNewPostTextActionCreator
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        state: state.profilePage,
    }
}

let mapDispatchToProps = dispatch => {
    return {
        likeButtonClick: id => dispatch(addLikeButtonActionCreator(id)),
        addPost: () => dispatch(addPostActionCreator()),
        updateNewPostText: text => dispatch(updateNewPostTextActionCreator(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;