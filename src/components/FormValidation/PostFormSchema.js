import * as Yup from 'yup';

const postFormSchema = Yup.object().shape({
    postText: Yup.string()
        .required("Required"),
})

export default postFormSchema;