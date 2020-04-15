import * as React from "react";
import { LoginPage } from "./Component/LoginPage";
import { Layout } from "./Layout/Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

interface AppProps {}

export const App = () => {
    const [token, SetToken] = React.useState("");
    React.useEffect(() => {
        SetToken(document.cookie);
    });
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route
                    render={() => {
                        if (document.cookie === "") {
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                    }}
                                />
                            );
                        } else {
                            return <Layout />;
                        }
                    }}
                />
            </Switch>
        </Router>
    );
};
