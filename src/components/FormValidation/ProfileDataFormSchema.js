import * as Yup from "yup";

const profileDataFormSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Required"),
})

export default profileDataFormSchema;