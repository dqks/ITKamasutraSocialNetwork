import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setProfileStatus} from "../../../redux/profileReducer";
import {getAuthUserId} from "../../../redux/authSelectors";
import {getProfileStatus} from "../../../redux/profileSelectors";

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false)
    const authUserId = useSelector(getAuthUserId)
    const profileStatus = useSelector(getProfileStatus)
    const [status, setStatus] = useState(profileStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        setStatus(profileStatus)
    }, [props, profileStatus]);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(setProfileStatus(status))
    }

    const changeStatusText = event => {
        setStatus(event.target.value)
        // dispatch(changeStatusActionCreator(event.target.value))
    }

    return (
        <div>
            {
                authUserId !== props.profileId
                    ? (<div>
                        <span>{profileStatus}</span>
                    </div>)
                    : <div>
                        {!editMode
                            ? <div>
                                <span onDoubleClick={activateEditMode}>{profileStatus}</span>
                            </div>
                            : <div>
                                <input onChange={changeStatusText} autoFocus={true} placeholder={"Status"} onBlur={deactivateEditMode} type="text"
                                       value={status}/>
                            </div>}
                    </div>
            }
        </div>
    )
}

export default ProfileStatus;