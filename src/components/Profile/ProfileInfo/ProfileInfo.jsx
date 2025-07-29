import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import defaultAvatar from "../../../assets/avatar.jpg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import {memo} from "react";

const ProfileInfo = ({profile}) => {
    if (!profile) {
        return <Preloader />
    } else {
        return (
            <div className={classes.profileInfo}>
                <div className={classes.profileMain}>
                    <img className={classes.avatar} src={profile.photos.large
                        ? profile.photos.large
                        : defaultAvatar} alt="Avatar" />
                    <div>
                        <p>{profile.fullName}</p>
                        <ProfileStatus profileId={profile.userId} />
                    </div>
                </div>
            </div>
        )
    }
}

export default memo(ProfileInfo);