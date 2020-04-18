import "./style.scss";
import * as React from "react";
import { Layout as LayoutAntd } from "antd";
import { Navigation } from "../Component/Navigation/Navigation";
import { Header as HeaderChild } from "../Component/Header/Header";
const { Sider, Header, Footer, Content } = LayoutAntd;
import { Routes } from "../Component/Routes/Routes";

interface AppProps {}

export const Layout = (props: AppProps) => {
    return (
        <LayoutAntd>
            <Sider trigger={null} collapsible>
                <a href="/">
                    <div className={"logo"}>
                        <img src={require("../image/logo.png")} alt="logo" />
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
                    <p>
                        © 2017 Piroll. All rights reserved. Designed by
                        robirurk.
                    </p>
                </Footer>
            </LayoutAntd>
        </LayoutAntd>
    );
};
