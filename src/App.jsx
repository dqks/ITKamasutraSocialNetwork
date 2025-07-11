import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import React from "react";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import MusicsContainer from "./components/Music/MusicsContainer";
import FriendsPage from "./components/FriendsPage/FriendsPage";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/*"
                               element={<Profile/>}/>
                        <Route path="/dialogs/*"
                               element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<MusicsContainer/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="friends" element={<FriendsPage/>}/>
                        <Route path="users" element={<UsersContainer/>}/>

                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
