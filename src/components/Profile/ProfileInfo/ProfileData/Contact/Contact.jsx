import classes from './Contact.module.css'

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.contact}>
                <b>{contactTitle}</b>: {contactValue}
            </p>
        </div>
    )
}

export default Contact;