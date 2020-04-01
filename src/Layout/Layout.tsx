import * as React from "react";
import { Layout } from "antd";
import { Navigation } from "../Component/Navigation";
import { FormAddProject } from "../Component/Main/FormAddProject";
import Table from "../Component/Main/Table";
import { Header as HeaderChild } from "../Component/Header/Header";
const { Sider, Header, Footer, Content } = Layout;
import { Provider } from "react-redux";
import { store } from "../redux/store";
interface AppProps {}

export const App = (props: AppProps) => {
    return (
        <Layout>
            <Sider>
                <h2 className={"logo"}>Logo</h2>
                <Navigation />
            </Sider>
            <Layout>
                <Header>
                    <HeaderChild />
                </Header>
                <Content>
                    <Provider store={store}>
                        <FormAddProject />
                    </Provider>
                </Content>
                <Footer>
                    <p>copyright © Loc</p>
                </Footer>
            </Layout>
        </Layout>
    );
};
