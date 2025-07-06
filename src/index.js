import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    );
}


rerenderEntireTree(store.getState())

store.subscribe(() => {
    rerenderEntireTree(store.getState());
})