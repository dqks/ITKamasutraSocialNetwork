import * as Yup from "yup";

interface SearchUserSchema {
    searchUserFilter: string;
}

const searchUserSchema : Yup.ObjectSchema<SearchUserSchema> = Yup.object().shape({
    searchUserFilter: Yup.string()
    .required("Required"),
})

export default searchUserSchema;