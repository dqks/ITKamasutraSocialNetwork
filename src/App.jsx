import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import UsersContainer from "./components/Users/UsersContainer";
import MusicsContainer from "./components/Music/MusicsContainer";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import Login from "./components/Login/Login";
import Dialogs from "./components/Dialogs/Dialogs";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/:userId?"
                               element={<Profile/>}/>
                        <Route path="/dialogs/*"
                               element={<Dialogs/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<MusicsContainer/>}/>
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