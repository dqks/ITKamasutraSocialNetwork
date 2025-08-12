import * as Yup from 'yup';

interface PostData {
    postText: string
}

const postFormSchema : Yup.ObjectSchema<PostData> = Yup.object().shape({
    postText: Yup.string()
        .required("Required"),
})

export default postFormSchema;