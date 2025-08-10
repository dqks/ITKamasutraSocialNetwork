import classes from "./InputComponent.module.css";
import {ErrorMessage} from "formik";

interface BlockInputProps {
    field: any
    form: any
    labeltext: string
}

const BlockInputComponent = ({
                                 field,
                                 form: {touched, errors},
                                 labeltext,
                                 ...props
                             }: BlockInputProps) => (
    <div className={classes.wrapper}>
        <label htmlFor={field.name}>{labeltext}</label>
        <input {...field} {...props} />
        <ErrorMessage className={classes.errorText} name={field.name} component="p"/>
    </div>
);

export default BlockInputComponent;