import {NavLink} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Menu, theme} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import {LaptopOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

interface NavbarProps {
}

export const Navbar = ({}: NavbarProps) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Sider style={{background: colorBgContainer}} width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%'}}
            >
                <SubMenu key="sub1" title="My Profile" icon={<UserOutlined/>}>
                    <Menu.Item key="1">
                        <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/dialogs">Messages</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/friends">Friends</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="Users" icon={<LaptopOutlined/>}>
                    <Menu.Item key="4">
                        <NavLink to={{
                            pathname: "/users",
                            search: "currentPage=1"
                        }}>
                            Users
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}
// <div className={classes.item}>
//     <NavLink to="/news" className={({isActive}) =>
//         (isActive ? classes.active : undefined)}>News</NavLink>
// </div>
// <div className={classes.item}>
//     <NavLink to="/music" className={({isActive}) =>
//         (isActive ? classes.active : undefined)}>Music</NavLink>
// </div>
// <div className={classes.item}>
//     <NavLink to="settings" className={({isActive}) =>
//         (isActive ? classes.active : undefined)}>Settings</NavLink>
// </div>
//СДЕЛАТБ ДРУЗЕЙ
// <div className={classes.item}>
//     <NavLink to={"/friends"} className={({isActive}) =>
//         (isActive ? classes.active : undefined)}>
//         <p>Friends</p>
//     </NavLink>
// </div>;