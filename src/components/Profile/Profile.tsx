import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {getProfileStatus, getUserProfile, setProfileActionCreator} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {getAuthUserId} from "../../redux/authSelectors";
import {getProfile} from "../../redux/profileSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const Profile = () => {
    useAuth()
    const params = useParams();
    const authUserId = useAppSelector(getAuthUserId)
    const profile = useAppSelector(getProfile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let userId : number | null = Number(params.userId);
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