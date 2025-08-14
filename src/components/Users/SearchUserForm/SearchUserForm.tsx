import {Field, Form, Formik} from "formik";
import classes from "./SearchUserForm.module.css"
import {useAppDispatch} from "../../../hooks/redux";
import SearchUserSchema from "../../FormValidation/SearchUserSchema";
import {setUserFilter} from "../../../redux/usersReducer";

interface SearchUserFormProps {
}

type InitialValues = {
    searchUserFilter: string
}

const SearchUserForm = ({}: SearchUserFormProps) => {
    const dispatch = useAppDispatch();
    const initialValues: InitialValues = {
        searchUserFilter: ""
    }

    const onDefaultFilterClick = () => {
        dispatch(setUserFilter(""))
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                dispatch(setUserFilter(values.searchUserFilter))
            }}
            validationSchema={SearchUserSchema}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({errors}) => {
                return (
                    <Form className={classes.wrapper}>
                        <Field name={"searchUserFilter"} type={"text"}
                            placeholder={"Search user by name"}
                            className={[classes.searchResult, errors.searchUserFilter ? classes.errorBorder : null].join(" ")}
                        />
                        <button type={"submit"} className={classes.formButton}>Find</button>
                        <button type={"button"} className={classes.formButton}
                            onClick={onDefaultFilterClick}>Default Filter
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SearchUserForm