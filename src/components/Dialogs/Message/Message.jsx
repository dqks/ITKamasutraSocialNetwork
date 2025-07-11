import classes from "./Mesage.module.css"

const Message = (props) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    )
}

export default Message;