import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {useDispatch, useSelector} from "react-redux";
import {getProfileStatus, getUserProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Profile = () => {
    const params = useParams();
    const authUserId = useSelector(state => state.auth.id)
    const isAuth = useSelector(state => state.auth.isAuth);
    const profile = useSelector(state => state.profilePage.profile);
    const dispatch = useDispatch();

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

    useAuth(isAuth)

    return <div>
        <ProfileInfo headerImg={img} profile={profile}/>
        <MyPosts/>
    </div>
}

export default Profile;