import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import defaultAvatar from "../../../assets/avatar.jpg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import {memo, useState} from "react";
import AvatarForm from "../AvatarForm/AvatarForm";
import {getAuthUserId} from "../../../redux/authSelectors";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {useAppSelector} from "../../../hooks/redux";
import {ProfileType} from "../../../redux/profileReducer";

interface ProfileInfoProps {
    profile: ProfileType | null
}

const ProfileInfo = ({profile} : ProfileInfoProps) => {
    const authUserId = useAppSelector(getAuthUserId);
    const [editMode, setEditMode] = useState<boolean>(false);
    if (!profile) {
        return <Preloader/>
    } else {
        const isOwner = authUserId === profile.userId;
        return (
            <div>
                <div className={classes.profileMain}>
                    <img className={classes.avatar} src={profile.photos.large
                        ? profile.photos.large
                        : defaultAvatar} alt="Avatar"/>
                    <div>
                        <h1 className={classes.fullName}>{profile.fullName}</h1>
                        <ProfileStatus profileId={profile.userId}/>
                        {editMode
                            ? <ProfileDataForm setEditModeFalse={() => setEditMode(false)} profile={profile}/>
                            : <ProfileData profile={profile} isOwner={isOwner} setEditModeTrue={() => {
                                    setEditMode(true)
                                }}/>}
                    </div>
                </div>
                {
                    isOwner && (
                        <div className={classes.avatarWrapper}>
                            <AvatarForm/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default memo(ProfileInfo);