import classes from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader";
import defaultAvatar from "../../../assets/avatar.jpg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    } else {
        return (
            <div className={classes.profileInfo}>
                {/*<div className={classes.header}>*/}
                {/*    <img src={props.headerImg} alt="Image" className={classes.headerImg} />*/}
                {/*</div>*/}
                <div className={classes.profileMain}>
                    <img src={props.profile.photos.large
                        ? props.profile.photos.large
                        : defaultAvatar} alt="Avatar" />
                    <div>
                        <p>{props.profile.fullName}</p>
                        <p>{props.profile.aboutMe}</p>
                        <ProfileStatus status={"Hello"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;