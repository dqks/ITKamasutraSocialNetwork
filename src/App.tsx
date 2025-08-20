import "./App.css";
import {BrowserRouter} from "react-router-dom";
import React, {useEffect} from "react";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {getInitialized} from "./redux/appSelectors";
import {Breadcrumb, Layout, theme} from 'antd';
import {AppHeader} from "./components/AppHeader/AppHeader";
import {AppFooter} from "./components/AppFooter/AppFooter";
import {Navbar} from "./components/Navbar/Navbar";
import {Main} from "./components/Main/Main";

const App = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const initialized = useAppSelector(getInitialized);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const abortController = new AbortController();
        dispatch(initializeApp(abortController.signal))
        return () => {
            abortController.abort();
        }
    }, [dispatch]);

    if (!initialized) {
        return (
            <div className="preloader-wrapper">
                <Preloader/>
            </div>
        )
    }
    return (
        <BrowserRouter>
            <Layout>
                <AppHeader/>
                <div style={{padding: '0 48px'}}>
                    <Breadcrumb
                        style={{margin: '16px 0'}}
                        items={[{title: 'Home'}, {title: 'List'}, {title: 'App'}]}
                    />
                    <Layout style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}>
                        <Navbar/>
                        <Main/>
                    </Layout>
                </div>
                <AppFooter/>
            </Layout>
        </BrowserRouter>
    );
};

export default App;