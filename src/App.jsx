import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import React from "react";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FriendsPageContainer from "./components/FriendsPage/FriendsPageContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar store={props.store}/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile"
                               element={<Profile store={props.store}/>}/>
                        <Route path="/dialogs/*"
                               element={<DialogsContainer store={props.store}/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="music" element={<Music/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="friends" element={<FriendsPageContainer store={props.store}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
