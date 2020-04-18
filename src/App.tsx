import * as React from "react";
import { LoginPage } from "./Component/LoginPage";
import { Layout } from "./Layout/Layout";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "@/redux/store";

interface AppProps {}

export const App = (prorp: AppProps) => {
    function getCookie(name) {
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        return "";
    }

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route
                            render={() => {
                                if (getCookie("auth") === "") {
                                    return (
                                        <Redirect
                                            to={{
                                                pathname: "/login",
                                            }}
                                        />
                                    );
                                }
                                return <Layout />;
                            }}
                        />
                    </Switch>
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>
    );
};
