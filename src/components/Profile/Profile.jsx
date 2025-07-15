import img from "../../assets/images.jpg";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {useNavigate, useParams} from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate();
    let isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const params = useParams();
    const authUserId = useSelector(state => state.auth.id)
    let userId;

    useEffect(() => {
        userId = params.userId;
        if (!userId) {
            if (!isAuth) {
                return navigate("/login")
            }
            userId = authUserId;
        }

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