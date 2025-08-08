// import classes from "./Mesage.module.css"
import {memo} from "react";

interface MessageProps {
    message: string
}

const Message = ({message} : MessageProps) => {
    return (
        <div>
            {message}
        </div>
    )
}

export default memo(Message);