import Contact from "./Contact/Contact";
import classes from "./ProfileData.module.css"
import {ContactsType, ProfileType} from "../../../../redux/profileReducer";

interface ProfileDataProps {
    profile: ProfileType
    isOwner: boolean
    setEditModeTrue: any
}

const ProfileData = ({profile, isOwner, setEditModeTrue} : ProfileDataProps) => {
    return (
        <div>
            <div>
                <p><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</p>
            </div>
            <div>
                <p><b>Stack:</b> {profile.lookingForAJobDescription}</p>
            </div>
            <div>
                <p><b>About me:</b> {profile.aboutMe}</p>
            </div>
            <div>
                <p><b>Contacts:</b></p>
                {Object.keys(profile.contacts).map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key] as string}/>
                })}
            </div>
            <div>
                {isOwner &&
                    <button onClick={setEditModeTrue} className={classes.editButton}>Edit</button>}
            </div>
        </div>
    )
}

export default ProfileData;