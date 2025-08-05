import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {useDispatch, useSelector} from "react-redux";
import {getProfileStatus, getUserProfile, setProfileActionCreator} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {getAuthUserId} from "../../redux/authSelectors";
import {getProfile} from "../../redux/profileSelectors";

const Profile = () => {
    useAuth()

    const params = useParams();
    const authUserId = useSelector(getAuthUserId)
    const profile = useSelector(getProfile);
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
        return () => {
            dispatch(setProfileActionCreator(null))
        }
    }, [params]);


    return <div>
            <ProfileInfo profile={profile}/>
            <MyPosts/>
        </div>

}

export default Profile;