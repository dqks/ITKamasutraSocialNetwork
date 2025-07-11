import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setProfileActionCreator} from "../../redux/profileReducer";

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${"2"}`)
            .then(response => {
                dispatch(setProfileActionCreator(response.data));
                console.log('response');
            })
    }, []);

    const profile = useSelector(state => state.profilePage.profile);

    return (
        <div>
            <ProfileInfo headerImg={img} profile={profile}/>
            <MyPosts/>
        </div>
    )
}

export default Profile;