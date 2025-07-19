import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css";
import React from "react";
import PostFormSchema from "../../../FormValidation/PostFormSchema";
import {useDispatch} from "react-redux";
import {addPostActionCreator} from "../../../../redux/profileReducer";

const PostForm = () => {
    const dispatch = useDispatch();
    return (
        <Formik initialValues={{postText: ""}}
                onSubmit={(value, actions) => {
                    dispatch(addPostActionCreator(value.postText))
                    actions.resetForm();
                }}
                validationSchema={PostFormSchema}>
            <Form>
                <div>
                    <Field size={40} className={classes.postText} type={"text"} name={"postText"}/>
                </div>
                <ErrorMessage className={classes.errorText} name={"postText"} component="p"/>
                <div>
                    <button type="submit" className={classes.addPostButton}>Add post</button>
                </div>
            </Form>
        </Formik>
    )
}

export default PostForm;