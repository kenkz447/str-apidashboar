import "antd/dist/antd.css";
import "./Style/style.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./Layout/Layout";
import { LoginPage } from "./Component/LoginPage";

function createElementRootApp() {
    const element = document.createElement("div");
    element.setAttribute("id", "root");
    return element;
}

export const render = () => {
    document.body.appendChild(createElementRootApp());
    ReactDOM.render(<App />, document.getElementById("root"));
};

render();
