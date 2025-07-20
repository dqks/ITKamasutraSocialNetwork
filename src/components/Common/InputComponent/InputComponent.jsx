import classes from "./InputComponent.module.css";
import {ErrorMessage} from "formik";

const InputComponent = ({
                            field,
                            form: {touched, errors},
                            ...props
                        }) => (
    <div className={classes.wrapper}>
        <label htmlFor={field.name}>{props.labelText}</label>
        <input {...field} {...props} />
        <ErrorMessage className={classes.errorText} name={field.name} component="p"/>
    </div>
);

export default InputComponent;