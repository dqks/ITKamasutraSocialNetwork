import classes from "./Captcha.module.css"
import React from "react";

interface CaptchaProps {
    captchaURL: string
    captchaValue: string
    onCaptchaInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Captcha = ({captchaURL,captchaValue, onCaptchaInputChange} : CaptchaProps) => {
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