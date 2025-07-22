import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import Login from "./components/Login/Login";
import Dialogs from "./components/Dialogs/Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader";
import {getInitialized} from "./redux/appSelectors";
import Musics from "./components/Music/Musics";

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
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route  path="/profile/:userId?"
                               element={<Profile/>}/>
                        <Route path="/dialogs/*"
                               element={<Dialogs/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Musics/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="friends" element={<FriendsPage/>}/>
                        <Route path="users" element={<UsersContainer/>}/>
                        <Route path="login" element={<Login />}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;