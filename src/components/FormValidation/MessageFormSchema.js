import * as Yup from 'yup';

const messageFormSchema = Yup.object().shape({
    messageText: Yup.string()
        .required("Required"),
})

export default messageFormSchema;