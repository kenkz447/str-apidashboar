import * as React from "react";
import { LoginPage } from "./Component/LoginPage";
import { Layout } from "./Layout/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";

interface AppProps {}

export const App = (props: AppProps) => {
    const [token, SetToken] = React.useState("");
    React.useEffect(() => {
        SetToken(document.cookie);
    }, []);
    if (token === "") {
        return <LoginPage />;
    }
    return <Layout />;
};
