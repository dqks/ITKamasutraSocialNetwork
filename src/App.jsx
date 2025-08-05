import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {getInitialized} from "./redux/appSelectors";
import {routes} from "./constants/routes";
import Profile from "./components/Profile/Profile";

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Music = React.lazy(() => import("./components/Music/Musics"));
const UsersPage = React.lazy(() => import("./components/Users/UsersContainerFC"));

const App = () => {
    const initialized = useSelector(getInitialized);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeApp())
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
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/profile"/>}/>
                        <Route path={routes.profile}
                               element={<Profile/>}/>
                        <Route path={routes.dialogs}
                               element={<Suspense fallback={<div><Preloader/></div>}>
                                   <Dialogs/>
                               </Suspense>}/>
                        <Route path={routes.news} element={<News/>}/>
                        <Route path={routes.music}
                               element={<Suspense fallback={<div><Preloader/></div>}>
                                   <Music/>
                               </Suspense>}/>
                        <Route path={routes.settings} element={<Settings/>}/>
                        <Route path={routes.friends} element={<FriendsPage/>}/>
                        <Route path={routes.users}
                               element={<Suspense fallback={<div><Preloader/></div>}>
                                   <UsersPage/>
                               </Suspense>}/>
                        <Route path={routes.login}
                               element={<Suspense fallback={<div><Preloader/></div>}>
                                   <Login/>
                               </Suspense>}/>
                        <Route path={routes.notFound} element={<div>404</div>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;