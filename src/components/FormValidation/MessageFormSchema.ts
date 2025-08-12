import * as Yup from 'yup';

interface MessageData {
    messageText: string
}

const messageFormSchema: Yup.ObjectSchema<MessageData> = Yup.object().shape({
    messageText: Yup.string()
        .required("Required"),
})

export default messageFormSchema;