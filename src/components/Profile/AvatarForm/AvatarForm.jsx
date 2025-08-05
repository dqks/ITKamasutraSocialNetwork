import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import React from "react";
import avatarFormSchema from "../../FormValidation/AvatarFormSchema";
import classes from "./AvatarForm.module.css"
import {setProfilePhoto} from "../../../redux/profileReducer";

const AvatarForm = () => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{photo: ""}}
                onSubmit={(values, actions) => {
                    dispatch(setProfilePhoto(values.photo))
                    actions.resetForm();
                }}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={avatarFormSchema}>
            {({setFieldValue, errors}) => {
                return (
                    <Form encType="multipart/form-data">
                        <input accept="image/png, image/jpeg, image/jpg"
                               className={[classes.avatarInput, errors.photo ? classes.errorBorder : null].join(" ")}
                               type="file" name="photo"
                               onChange={(event) => {
                                   setFieldValue('photo', event.currentTarget.files?.[0]);
                               }}/>
                        <button type={"submit"} className={classes.uploadPhoto}>Добавить</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AvatarForm
