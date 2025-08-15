import {Field, Form, Formik} from "formik";
import classes from "./SearchUserForm.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import SearchUserSchema from "../../FormValidation/SearchUserSchema";
import {setFriendFilter, setUserNameFilter} from "../../../redux/usersReducer";
import {useEffect} from "react";
import {getNameFilter} from "../../../redux/usersSelectors";

interface SearchUserFormProps {
}

type InitialValues = {
    searchUserFilter: string
    friendFilter: string
}

const SearchUserForm = ({}: SearchUserFormProps) => {
    const dispatch = useAppDispatch();

    const userNameFilter = useAppSelector(getNameFilter);

    const initialValues: InitialValues = {
        searchUserFilter: userNameFilter,
        friendFilter: ""
    }

    const onDefaultFilterClick = () => {
        dispatch(setUserNameFilter(""))
        dispatch(setFriendFilter(null))
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values : InitialValues) => {
                if (values.friendFilter === "allUsers") {
                    dispatch(setUserNameFilter(values.searchUserFilter))
                    dispatch(setFriendFilter(null))
                } else if (values.friendFilter === "friendsOnly") {
                    dispatch(setUserNameFilter(values.searchUserFilter))
                    dispatch(setFriendFilter(true))
                } else {
                    dispatch(setUserNameFilter(values.searchUserFilter))
                    dispatch(setFriendFilter(false))
                }
            }}
            // validationSchema={SearchUserSchema}
            // validateOnBlur={false}
            // validateOnChange={true}
        >
            {({errors}) => {
                return (
                    <Form className={classes.wrapper}>
                        <Field name={"searchUserFilter"} type={"text"}
                            placeholder={"Search user by name"}
                            className={[classes.searchResult, errors.searchUserFilter ? classes.errorBorder : null].join(" ")}
                        />
                        <Field name={"friendFilter"} component={"select"} className={classes.selectInput}>
                            <option value="allUsers">All Users</option>
                            <option value="friendsOnly">Friends</option>
                            <option value="notFriends">Not Friends</option>
                        </Field>
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