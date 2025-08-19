import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../redux/authReducer";
import {getAvatarUrl, getIsAuth} from "../../redux/authSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Avatar, Button, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {Header} from "antd/es/layout/layout";

interface HeaderProps {
}

export const AppHeader = ({}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth)
    const avatarUrl = useAppSelector(getAvatarUrl)

    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{flex: 1, minWidth: 0}}
            >
                <Menu.Item key="1">
                    <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
            </Menu>
            {isAuth
                ?
                <div className={classes.authWrapper}>
                    {avatarUrl
                        ? <Avatar gap={100} src={avatarUrl} size={50} icon={<UserOutlined/>}/>
                        : <Avatar gap={100} style={{backgroundColor: '#87d068'}} size={50} icon={<UserOutlined/>}/>}

                    <Button onClick={onLogout}>Logout</Button>
                </div>
                : <NavLink className={classes.loginText} to={"/login"}>Login</NavLink>}
        </Header>
    )
}