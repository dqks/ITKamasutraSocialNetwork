// import classes from "./Mesage.module.css"
import {memo} from "react";

const Message = (props) => {
    return (
        <div>
            {props.message}
        </div>
    )
}

export default memo(Message);