import classes from "./Captcha.module.css"

const Captcha = ({captchaURL,captchaValue, onCaptchaInputChange}) => {
    return (
        <div className={classes.captchaWrapper}>
            <img src={captchaURL} alt="captcha"/>
            <div>
                <input onChange={onCaptchaInputChange} value={captchaValue} type="text"
                       name="captchaText" placeholder={"Captcha"}/>
            </div>
        </div>
    )
}

export default Captcha;