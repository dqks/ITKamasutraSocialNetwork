import {Field, Form, Formik} from "formik";
import classes from "./SearchUserForm.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setCurrentPage, setFriendFilter, setUserNameFilter} from "../../../redux/usersReducer";
import {getNameFilter} from "../../../redux/usersSelectors";
import {useNavigate} from "react-router-dom";

interface SearchUserFormProps {
}

type InitialValues = {
    searchUserFilter: string
    friendFilter: string
}

const SearchUserForm = ({}: SearchUserFormProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
            onSubmit={(values: InitialValues) => {
                let friendFilter: boolean | null = null;
                if (values.friendFilter === "allUsers") {
                    friendFilter = null
                } else if (values.friendFilter === "friendsOnly") {
                    friendFilter = true
                } else if (values.friendFilter === "notFriends") {
                    friendFilter = false
                }

                debugger

                navigate({
                    pathname: "/users",
                    search: "?currentPage=1" + "&term=" + values.searchUserFilter + "&friend=" + friendFilter
                })

                dispatch(setCurrentPage(1))
                dispatch(setUserNameFilter(values.searchUserFilter))
                dispatch(setFriendFilter(friendFilter))
            }}
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