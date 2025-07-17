import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeStatusActionCreator, setProfileStatus} from "../../../redux/profileReducer";

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false)
    const authUserId = useSelector(state => state.auth.id)
    const profileStatus = useSelector(state => state.profilePage.profileStatus)
    const [status, setStatus] = useState(profileStatus)
    const dispatch = useDispatch()

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(setProfileStatus(status))
    }

    const changeStatusText = event => {
        setStatus(event.target.value)
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

// !editMode && props.status
//     ? <div>
//         <span onDoubleClick={activateEditMode}>{props.status}</span>
//     </div>
//     : <div>
//         <input onChange={changeStatus} placeholder={"Status"} onBlur={deactivateEditMode} type="text"
//                value={props.status}/>
//     </div>

export default ProfileStatus;