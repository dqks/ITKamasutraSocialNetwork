import * as Yup from 'yup';

const avatarFormSchema = Yup.object().shape({
    photo: Yup.string()
        .required("Required"),
})

export default avatarFormSchema;