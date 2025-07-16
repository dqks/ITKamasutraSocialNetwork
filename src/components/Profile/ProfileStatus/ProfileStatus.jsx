import classes from "./ProfileStatus.Module.css"
import {useState} from "react";

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false)
    return (
        <div>
            {!editMode
                ? <div>
                    <span>{props.status}</span>
                </div>
                : <div>
                    <input type="text" value={props.status}/>
                </div>}
        </div>

    )
}

export default ProfileStatus;