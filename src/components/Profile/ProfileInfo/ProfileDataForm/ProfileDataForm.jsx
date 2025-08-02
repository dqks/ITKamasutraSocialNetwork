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
        <b><label htmlFor={field.name}>{props.labelText}</label></b>
        <input {...field} {...props} />
        {/*<ErrorMessage className={classes.errorText} name={field.name} component="p"/>*/}
    </div>
);


const ProfileDataForm = ({profile, setEditModeFalse}) => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAjob,
            lookingForAJobDescription: !profile.lookingForAJobDescription ? "" : profile.lookingForAJobDescription,
            aboutMe: !profile.aboutMe ? "" : profile.aboutMe,
            facebook: !profile.contacts.facebook ? "" : profile.contacts.facebook,
            website: !profile.contacts.website ? "" : profile.contacts.website,
            vk: !profile.contacts.vk ? "" : profile.contacts.vk,
            twitter: !profile.contacts.twitter ? "" : profile.contacts.twitter,
            instagram: !profile.contacts.instagram ? "" : profile.contacts.instagram,
            youtube: !profile.contacts.youtube ? "" : profile.contacts.youtube,
            github: !profile.contacts.github ? "" : profile.contacts.github,
            mainLink: !profile.contacts.mainLink ? "" : profile.contacts.mainLink,
        }}
                onSubmit={(values, actions) => {
                    dispatch(saveProfileData(values));
                    setEditModeFalse()
                    actions.resetForm();
                }}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={profileDataFormSchema}>
            {({errors}) => {
                return (
                    <Form>
                        <Field labelText={"Name:"} component={InlineInputComponent} type="text" name="fullName"/>
                        <div className={classes.fieldWrapper}>
                            <b><label htmlFor="lookingForAJob">Looking for a job: </label></b>
                            <Field type="checkbox" name="lookingForAJob"/>
                        </div>
                        <Field labelText={"Stack: "} component={InlineInputComponent} type="text"
                               name="lookingForAJobDescription"/>
                        <Field labelText={"About me: "} component={InlineInputComponent} type="text" name="aboutMe"/>
                        <p><b>Contacts:</b></p>
                        <Field labelText={"facebook: "} component={InlineInputComponent} type="text" name="facebook"/>
                        <Field labelText={"website: "} component={InlineInputComponent} type="text" name="website"/>
                        <Field labelText={"vk: "} component={InlineInputComponent} type="text" name="vk"/>
                        <Field labelText={"twitter: "} component={InlineInputComponent} type="text" name="twitter"/>
                        <Field labelText={"instagram: "} component={InlineInputComponent} type="text" name="instagram"/>
                        <Field labelText={"youtube: "} component={InlineInputComponent} type="text" name="youtube"/>
                        <Field labelText={"github: "} component={InlineInputComponent} type="text" name="github"/>
                        <Field labelText={"mainLink: "} component={InlineInputComponent} type="text" name="mainLink"/>
                        <button type={"submit"} className={classes.saveData}>Save</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileDataForm;