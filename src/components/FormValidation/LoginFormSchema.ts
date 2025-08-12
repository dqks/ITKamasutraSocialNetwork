import * as Yup from 'yup';

interface LoginData {
    password: string
}

const loginFormSchema : Yup.ObjectSchema<LoginData> = Yup.object().shape({
    // email: Yup.string()
        // .min(2, "Must be longer than 2 characters")
        // .max(20, "Name can't be longer than 20 characters")
        // .required("Required"),
    password: Yup.string()
        .min(8, "Must be longer than 8 characters")
        .required("Required"),
})

export default loginFormSchema;