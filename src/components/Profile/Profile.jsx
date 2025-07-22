import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {useDispatch, useSelector} from "react-redux";
import {getProfileStatus, getUserProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {getAuthUserId} from "../../redux/authSelectors";
import {getProfile} from "../../redux/profileSelectors";

const Profile = () => {
    const params = useParams();

    const authUserId = useSelector(getAuthUserId)
    const profile = useSelector(getProfile);
    const dispatch = useDispatch();

    useAuth()

    useEffect(() => {
        let userId = params.userId;
        if (!userId) {
            userId = authUserId;
        }
        if (userId) {
            dispatch(getUserProfile(userId));
            dispatch(getProfileStatus(userId))
        }
    }, [params]);


    return <div>
            <ProfileInfo headerImg={img} profile={profile}/>
            <MyPosts/>
        </div>

}

export default Profile;