import img from "../../assets/images.jpg";
import avatar from "../../assets/avatar.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React from "react";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div>
            <ProfileInfo headerImg={img} avatar={avatar}/>
            <MyPosts/>
        </div>
    )
}

export default Profile;