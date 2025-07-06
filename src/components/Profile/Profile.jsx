import img from "./../../img/images.jpg";
import avatar from "./../../img/avatar.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";


const Profile = (props) => {
    return (
        <div>

            <ProfileInfo headerImg={img} avatar={avatar}/>
            {/*<MyPostsContainer store={props.store} />*/}
            <MyPostsContainer />
        </div>
    )
}

export default Profile;