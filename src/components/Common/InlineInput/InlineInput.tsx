import classes from "./InlineInput.module.css";
import React from "react";

interface InlineInputProps {
    field: {
        name: string;
        value: string;
        onChange: any
        onBlur: any
    }
    type: string
    labeltext: string
}

export const InlineInput = ({
    field,
    type,
    labeltext
}: InlineInputProps) => (
    <div className={classes.fieldWrapper}>
        <b><label htmlFor={field.name}>{labeltext}</label></b>
        <input className={classes.input} {...field} type={type}/>
    </div>
);