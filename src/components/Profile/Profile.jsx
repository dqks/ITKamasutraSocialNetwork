import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, setProfileActionCreator} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {profileAPI} from "../../api/api";

const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const authId = useSelector(state => state.auth.id)
    let userId;

    useEffect(() => {
        userId = params.userId;
        if (!userId) userId = authId;

        dispatch(getUserProfile(userId));
    }, [params]);

    const profile = useSelector(state => state.profilePage.profile);

    return (
        <div>
            <ProfileInfo headerImg={img} profile={profile}/>
            <MyPosts/>
        </div>
    )
}

export default Profile;