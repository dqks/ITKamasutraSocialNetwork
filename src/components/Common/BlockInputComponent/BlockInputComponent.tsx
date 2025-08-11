import classes from "./InputComponent.module.css";
import {ErrorMessage} from "formik";
import {FieldInputProps} from "formik/dist/types";

interface BlockInputProps {
    field: FieldInputProps<string>
    labeltext: string
    type: string
    size: number
}

const BlockInputComponent = ({
                                 field,
                                 labeltext,
                                 type,
                                 size
                             }: BlockInputProps) => (
    <div className={classes.wrapper}>
        <label htmlFor={field.name}>{labeltext}</label>
        <input {...field} type={type} size={size} />
        <ErrorMessage className={classes.errorText} name={field.name} component="p"/>
    </div>
);

export default BlockInputComponent;