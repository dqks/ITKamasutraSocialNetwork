import * as Yup from 'yup';

interface AvatarData {
    photo: string
}

const avatarFormSchema : Yup.ObjectSchema<AvatarData> = Yup.object().shape({
    photo: Yup.string()
        .required("Required"),
})

export default avatarFormSchema;