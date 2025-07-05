import classes from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
    return (
        <div className={classes.profileInfo}>

            <div className={classes.header}>
                <img src={props.headerImg} alt="Image" className={classes.headerImg} />
            </div>

            <div className={classes.profileMain}>
                <img src={props.avatar} alt="Avatar" />
            </div>
        </div>
    )
}

export default ProfileInfo;