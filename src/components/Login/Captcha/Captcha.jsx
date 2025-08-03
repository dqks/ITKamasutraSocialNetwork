import classes from "./Captcha.module.css"
import {useState} from "react";

const Captcha = ({captchaURL}) => {
    const [captchaValue, setCaptchaValue] = useState("");

    const onCaptchaInputChange = (event) => {
        setCaptchaValue(event.target.value);
    };

    return (
        <div className={classes.wrapper}>
            <img src={captchaURL} alt="captcha"/>
            <div>
                <input onChange={onCaptchaInputChange} value={captchaValue} type="text" name="captchaText" placeholder={"Captcha"} />
            </div>
        </div>
    )
}

export default Captcha;