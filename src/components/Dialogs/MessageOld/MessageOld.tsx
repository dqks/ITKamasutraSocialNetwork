// import classes from "./Mesage.module.css"
import {memo} from "react";

interface MessageProps {
    message: string
}

const MessageOld = ({message} : MessageProps) => {
    return (
        <div>
            {message}
        </div>
    )
}

export default memo(MessageOld);