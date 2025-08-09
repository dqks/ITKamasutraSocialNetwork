import {Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css";
import PostFormSchema from "../../../FormValidation/PostFormSchema";
import {addPostActionCreator} from "../../../../redux/profileReducer";
import {useAppDispatch} from "../../../../hooks/redux";

interface PostInitialValues {
    postText: string
}

const PostForm = () => {
    const dispatch = useAppDispatch();
    const initialValues : PostInitialValues = {postText: ""}
    return (
        <Formik initialValues={initialValues}
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

export default PostForm;