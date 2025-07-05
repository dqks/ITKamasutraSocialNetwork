import logo from "./../../img/Logo.png"
import classes from "./Header.module.css"

const Header = () => {
    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo" />
        </header>
    )
}

export default Header;