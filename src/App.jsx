import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {getInitialized} from "./redux/appSelectors";
import Musics from "./components/Music/Musics";
import UsersContainerFC from "./components/Users/UsersContainerFC";
import {routes} from "./constants/routes";

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));
const Profile = React.lazy(() => import("./components/Profile/Profile"))

const App = () => {
    const initialized = useSelector(getInitialized);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch]);

     if (!initialized) {
        return (
            <div className="preloader-wrapper">
                <Preloader />
            </div>
            )
     }
    return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="app-wrapper">
                    <Header/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Routes>
                            <Route  path={routes.profile}
                                    element={<Suspense fallback={<div><Preloader /></div>}>
                                        <Profile/>
                                    </Suspense>}/>

                            <Route path={routes.dialogs}
                                   element={<Suspense fallback={<div><Preloader /></div>}>
                                       <Dialogs/>
                                   </Suspense>}/>

                            <Route path={routes.news} element={<News/>}/>
                            <Route path={routes.music} element={<Musics/>}/>
                            <Route path={routes.settings} element={<Settings/>}/>
                            <Route path={routes.friends} element={<FriendsPage/>}/>
                            <Route path={routes.users} element={<UsersContainerFC/>}/>
                            <Route path={routes.login} element={<Login />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
    );
};

export default App;