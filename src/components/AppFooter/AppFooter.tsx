import {Footer} from "antd/es/layout/layout";
import React from "react";

export const AppFooter = () => {
    return (
        <Footer style={{textAlign: 'center'}}>
            Social Network ©{new Date().getFullYear()} Created by dqks
        </Footer>
    )
}