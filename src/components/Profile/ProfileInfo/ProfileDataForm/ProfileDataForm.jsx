import classes from "./ProfileDataForm.module.css"
import {Field, Form, Formik} from "formik";
import React from "react";
import profileDataFormSchema from "../../../FormValidation/ProfileDataFormSchema";
import {useDispatch} from "react-redux";
import {saveProfileData} from "../../../../redux/profileReducer";

const InlineInputComponent = ({
                                  field,
                                  form: {touched, errors},
                                  ...props
                              }) => (
    <div className={classes.fieldWrapper}>
        <b><label htmlFor={field.name}>{props.labeltext}</label></b>
        <input {...field} {...props} />
    </div>
);

const propHelper = prop => !prop ? "" : prop

const ProfileDataForm = ({profile, setEditModeFalse}) => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAjob,
            lookingForAJobDescription: propHelper(profile.lookingForAJobDescription),
            aboutMe: propHelper(profile.aboutMe),
            facebook: propHelper(profile.contacts.facebook),
            website: propHelper(profile.contacts.website),
            vk: propHelper(profile.contacts.vk),
            twitter: propHelper(profile.contacts.twitter),
            instagram:propHelper(profile.contacts.instagram),
            youtube: propHelper(profile.contacts.youtube),
            github: propHelper(profile.contacts.github),
            mainLink: propHelper(profile.contacts.mainLink),
            errorMessage: "",
        }}
                onSubmit={(values, {setFieldValue}) => {
                    dispatch(saveProfileData(values, setFieldValue, setEditModeFalse));
                }}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={profileDataFormSchema}>
            {({errors, values}) => {
                return (
                    <Form>
                        <Field labeltext={"Name:"} component={InlineInputComponent} type="text" name="fullName"/>
                        <div className={classes.fieldWrapper}>
                            <b><label htmlFor="lookingForAJob">Looking for a job: </label></b>
                            <Field type="checkbox" name="lookingForAJob"/>
                        </div>
                        <Field labeltext={"Stack: "} component={InlineInputComponent} type="text"
                               name="lookingForAJobDescription"/>
                        <Field labeltext={"About me: "} component={InlineInputComponent} type="text" name="aboutMe"/>
                        <p><b>Contacts:</b></p>
                        <Field labeltext={"facebook: "} component={InlineInputComponent} type="text" name="facebook"/>
                        <Field labeltext={"website: "} component={InlineInputComponent} type="text" name="website"/>
                        <Field labeltext={"vk: "} component={InlineInputComponent} type="text" name="vk"/>
                        <Field labeltext={"twitter: "} component={InlineInputComponent} type="text" name="twitter"/>
                        <Field labeltext={"instagram: "} component={InlineInputComponent} type="text" name="instagram"/>
                        <Field labeltext={"youtube: "} component={InlineInputComponent} type="text" name="youtube"/>
                        <Field labeltext={"github: "} component={InlineInputComponent} type="text" name="github"/>
                        <Field labeltext={"mainLink: "} component={InlineInputComponent} type="text" name="mainLink"/>
                        {values.errorMessage ? <p className={classes.errorMessage}>{values.errorMessage}</p> : null}
                        <button type={"submit"} className={classes.saveData}>Save</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileDataForm;