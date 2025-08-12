import * as Yup from "yup";

interface ProfileData {
    fullName: string;
}

const profileDataFormSchema : Yup.ObjectSchema<ProfileData> = Yup.object().shape({
    fullName: Yup.string()
        .required("Required"),
})

export default profileDataFormSchema;