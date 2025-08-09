import classes from './Contact.module.css'

interface ContactProps {
    contactTitle: string
    contactValue: string
}

const Contact = ({contactTitle, contactValue} : ContactProps) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.contact}>
                <b>{contactTitle}</b>: {contactValue}
            </p>
        </div>
    )
}

export default Contact;