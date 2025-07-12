import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setProfileActionCreator} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    let userId;

    useEffect(() => {
        userId = params.userId;
        if (!userId) userId = 2;

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                dispatch(setProfileActionCreator(response.data));
            })
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