import React, {memo, useEffect, useState} from "react";
import {setProfileStatus} from "../../../redux/profileReducer";
import {getAuthUserId} from "../../../redux/authSelectors";
import {getProfileStatus} from "../../../redux/profileSelectors";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

interface ProfileStatusProps {
    profileId: number
}

const ProfileStatus = ({profileId} : ProfileStatusProps) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const authUserId = useAppSelector(getAuthUserId)
    const profileStatus = useAppSelector(getProfileStatus)
    const [status, setStatus] = useState<string>(profileStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setStatus(profileStatus)
    }, [profileStatus]);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(setProfileStatus(status))
    }

    const changeStatusText = (event : React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    return (
        <div>
            {
                authUserId !== profileId
                    ? (<div>
                        <span><b>Status:</b> {profileStatus}</span>
                    </div>)
                    : <div>
                        {!editMode
                            ? <div>
                                <span data-testid="status"
                                      onDoubleClick={activateEditMode}><b>Status:</b> {profileStatus}</span>
                            </div>
                            : <div>
                                <input className={"inputTest"} name="status" onChange={changeStatusText} autoFocus={true}
                                       placeholder={"Status"} onBlur={deactivateEditMode} type="text"
                                       value={status}/>
                            </div>}
                    </div>
            }
        </div>
    )
}

export default memo(ProfileStatus);