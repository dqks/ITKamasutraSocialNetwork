import React from "react";
import App from "./App";
import ReactDOM, {Container} from "react-dom/client";
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root') as Container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);