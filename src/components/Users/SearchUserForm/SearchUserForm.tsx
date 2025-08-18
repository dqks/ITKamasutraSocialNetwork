import {Field, Form, Formik} from "formik";
import classes from "./SearchUserForm.module.css"
import {useAppSelector} from "../../../hooks/redux";
import {getFriendFilter, getNameFilter} from "../../../redux/usersSelectors";
import {setFriendValue} from "../../../utils/set-friend-value";
import {useQueryFilter} from "../../../hooks/useQueryFilter";

interface SearchUserFormProps {
}

type InitialValues = {
    searchUserFilter: string
    friendFilter: string
}

const SearchUserForm = ({}: SearchUserFormProps) => {
    const [setSearchFilter] = useQueryFilter()
    const userNameFilter = useAppSelector(getNameFilter);
    const friendFilter = useAppSelector(getFriendFilter);

    const initialValues: InitialValues = {
        searchUserFilter: userNameFilter,
        friendFilter: setFriendValue(friendFilter),
    }

    const onDefaultFilterClick = () => {
        setSearchFilter(true, 1, "", null)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: InitialValues) => {
                let friendFilter: boolean | null = null;
                if (values.friendFilter === "friendsOnly") {
                    friendFilter = true
                } else if (values.friendFilter === "notFriends") {
                    friendFilter = false
                }

                if (friendFilter === null && values.searchUserFilter === "") {
                    setSearchFilter(true, 1, values.searchUserFilter, friendFilter)
                } else {
                    setSearchFilter(false, 1, values.searchUserFilter, friendFilter)
                }
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