import {Content} from "antd/es/layout/layout";
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import Profile from "./Profile/Profile";
import React, {Suspense} from "react";
import Preloader from "./Common/Preloader/Preloader";
import News from "./News/News";
import Settings from "./Settings/Settings";
import FriendsPage from "./FriendsPage/FriendsPage";

const Dialogs = React.lazy(() => import("../components/Dialogs/Dialogs"));
const Login = React.lazy(() => import("../components/Login/Login"));
const Music = React.lazy(() => import("../components/Music/Musics"));
const UsersPage = React.lazy(() => import("../components/Users/UsersContainer"));

export const Main = () => {
    return (
        <Content style={{padding: '0 24px', minHeight: 280}}>
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
        </Content>

    )
}