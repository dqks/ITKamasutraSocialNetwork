import classes from "./ProfileDataForm.module.css"
import {Field, Form, Formik} from "formik";
import React from "react";
import profileDataFormSchema from "../../../FormValidation/ProfileDataFormSchema";
import {ProfileType, saveProfileData} from "../../../../redux/profileReducer";
import {useAppDispatch} from "../../../../hooks/redux";
import {InlineInput} from "../../../Common/InlineInput/InlineInput";

interface ProfileDataFormProps {
    profile: ProfileType
    setEditModeFalse: any
}

export type ProfileDataInitialValues = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
    errorMessage: string
}

const ProfileDataForm = ({profile, setEditModeFalse}: ProfileDataFormProps) => {
    const dispatch = useAppDispatch();
    const initialValues: ProfileDataInitialValues = {
        fullName: profile.fullName,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        aboutMe: profile.aboutMe,
        facebook: profile.contacts.facebook,
        website: profile.contacts.website,
        vk: profile.contacts.vk,
        twitter: profile.contacts.twitter,
        instagram: profile.contacts.instagram,
        youtube: profile.contacts.youtube,
        github: profile.contacts.github,
        mainLink: profile.contacts.mainLink,
        errorMessage: "",
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values,
                {setFieldValue}) => {
                dispatch(saveProfileData(values, setFieldValue, setEditModeFalse));
            }}
            validateOnBlur={false}
            validateOnChange={true}
            validationSchema={profileDataFormSchema}>
            {({values}) => {
                return (
                    <Form>
                        <Field labeltext={"Name:"} component={InlineInput} type="text" name="fullName"/>
                        <div className={classes.fieldWrapper}>
                            <b><label htmlFor="lookingForAJob">Looking for a job: </label></b>
                            <Field type="checkbox" name="lookingForAJob"/>
                        </div>
                        <Field labeltext={"Stack: "} component={InlineInput} type="text"
                            name="lookingForAJobDescription"/>
                        <Field labeltext={"About me: "} component={InlineInput} type="text" name="aboutMe"/>
                        <p><b>Contacts:</b></p>
                        <Field labeltext={"facebook: "} component={InlineInput} type="text" name="facebook"/>
                        <Field labeltext={"website: "} component={InlineInput} type="text" name="website"/>
                        <Field labeltext={"vk: "} component={InlineInput} type="text" name="vk"/>
                        <Field labeltext={"twitter: "} component={InlineInput} type="text" name="twitter"/>
                        <Field labeltext={"instagram: "} component={InlineInput} type="text" name="instagram"/>
                        <Field labeltext={"youtube: "} component={InlineInput} type="text" name="youtube"/>
                        <Field labeltext={"github: "} component={InlineInput} type="text" name="github"/>
                        <Field labeltext={"mainLink: "} component={InlineInput} type="text" name="mainLink"/>
                        {values.errorMessage ? <p className={classes.errorMessage}>{values.errorMessage}</p> : null}
                        <button type={"submit"} className={classes.saveData}>Save</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileDataForm;