import {Field, Form, Formik} from "formik";
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
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={PostFormSchema}>
                {({errors}) => {
                    return <Form>
                        <div>
                            <Field component={"textarea"} className={errors.postText ? classes.errorBorder : null} cols={"40"} rows={3} type={"text"} name={"postText"} />
                        </div>
                        <div>
                            <button type="submit" className={classes.addPostButton}>Add post</button>
                        </div>
                    </Form>
                }}
        </Formik>
    )
}
// className={errors.messageText ? classes.errorBorder : null}
export default PostForm;