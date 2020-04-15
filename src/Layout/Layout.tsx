import "./style.scss";
import * as React from "react";
import { Layout as LayoutAntd } from "antd";
import { Navigation } from "../Component/Navigation/Navigation";
import { Header as HeaderChild } from "../Component/Header/Header";
const { Sider, Header, Footer, Content } = LayoutAntd;
import { Provider } from "react-redux";
import { Routes } from "../Component/Routes/Routes";
import { ConnectedRouter } from "connected-react-router";
import { Link } from "react-router-dom";
import configureStore, { history } from "../redux/configureStore";

interface AppProps {}

const store = configureStore();

export const Layout = (props: AppProps) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <LayoutAntd>
                    <Sider>
                        <a href="/">
                            <div className={"logo"}>
                                <img
                                    src={require("../image/logo.png")}
                                    alt="logo"
                                />
                            </div>
                        </a>
                        <Navigation />
                    </Sider>
                    <LayoutAntd>
                        <Header>
                            <HeaderChild />
                        </Header>
                        <Content>
                            <Routes />
                        </Content>
                        <Footer>
                            <p>copyright © Loc</p>
                        </Footer>
                    </LayoutAntd>
                </LayoutAntd>
            </ConnectedRouter>
        </Provider>
    );
};
