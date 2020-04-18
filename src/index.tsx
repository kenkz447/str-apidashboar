import "antd/dist/antd.css";
import "./Style/style.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

function createElementRootApp(id) {
    const element = document.createElement("div");
    element.setAttribute("id", id);
    return element;
}
export const render = (element) => {
    document.body.appendChild(createElementRootApp(element));
    ReactDOM.render(<App />, document.getElementById(element));
};

render("root");
