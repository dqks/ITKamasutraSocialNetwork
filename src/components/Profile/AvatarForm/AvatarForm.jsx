import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import React from "react";
import avatarFormSchema from "../../FormValidation/AvatarFormSchema";
import classes from "./AvatarForm.module.css"
import {setProfilePhoto} from "../../../redux/profileReducer";

const AvatarForm = () => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{photo: ""}}
                onSubmit={(values, actions) => {
                    let formData = new FormData();
                    formData.append("image", values.photo);
                    dispatch(setProfilePhoto(formData))
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
                               type="file" name="photo" onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            setFieldValue('photo', file);
                        }}/>
                        {/*<Field accept="image/png, image/jpeg, image/jpg" type={"file"} name={"photo"} className={[classes.avatarInput, errors.photo ? classes.errorBorder : null].join(" ")}/>*/}
                        <button type={"submit"} className={classes.uploadPhoto}>Добавить</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AvatarForm
