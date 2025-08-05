// import classes from "./Mesage.module.css"
import {memo} from "react";

const Message = (props) => {
    console.log("Message rerender")
    debugger
    return (
        <div>
            {props.message}
        </div>
    )
}

export default memo(Message);