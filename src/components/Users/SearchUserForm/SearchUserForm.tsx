import {Field, Form, Formik} from "formik";
import classes from "./SearchUserForm.module.css"
import {useAppSelector} from "../../../hooks/redux";
import {getFriendFilter, getNameFilter} from "../../../redux/usersSelectors";
import {setFriendValue} from "../../../utils/set-friend-value";
import {useQueryFilter} from "../../../hooks/useQueryFilter";
import {useDebounce} from "../../../hooks/useDebounce";
import React from "react";

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
        setSearchFilter(1, "", null)
    }

    const onChangeField = useDebounce((values: InitialValues) => {
        let friendFilter: boolean | null = null;
        if (values.friendFilter === "friendsOnly") {
            friendFilter = true
        } else if (values.friendFilter === "notFriends") {
            friendFilter = false
        }
        debugger
        if (friendFilter === null && values.searchUserFilter === "") {
            setSearchFilter(1, values.searchUserFilter, friendFilter)
        } else {
            setSearchFilter(1, values.searchUserFilter, friendFilter)
        }
    }, 500)

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => onChangeField(values)}
        >
            {({errors, handleChange, handleSubmit}) => {
                const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e)
                    handleSubmit()
                }
                return (
                    <Form className={classes.wrapper}>
                        <Field name={"searchUserFilter"} type={"text"}
                            placeholder={"Search user by name"}
                            className={[classes.searchResult, errors.searchUserFilter ? classes.errorBorder : null].join(" ")}
                            onChange={onChangeForm}
                        />
                        <Field name={"friendFilter"} component={"select"} className={classes.selectInput}
                            onChange={onChangeForm}
                            >
                            <option value="allUsers">All Users</option>
                            <option value="friendsOnly">Friends</option>
                            <option value="notFriends">Not Friends</option>
                        </Field>
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