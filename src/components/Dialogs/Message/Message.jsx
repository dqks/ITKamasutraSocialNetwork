// import classes from "./Mesage.module.css"
import {memo, useEffect} from "react";

const Message = (props) => {
    useEffect(() => {
        console.log("render");
    })
    // console.log(props);
    return (
        <div>
            {props.message}
        </div>
    )
}

export default memo(Message);