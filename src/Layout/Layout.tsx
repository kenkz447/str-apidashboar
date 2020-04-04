import * as React from "react";
import { Layout } from "antd";
import { Navigation } from "../Component/Navigation";
import { FormAddProject } from "../Component/Main/FormAddProject";
import { WrapTable } from "../Component/Main/WrapTable";
import { WrapHomeImageGallery } from "../Component/Main/WrapHomeImageGallery";
import { AddHomeImage } from "../Component/Main/AddHomeImage";
import { Header as HeaderChild } from "../Component/Header/Header";
const { Sider, Header, Footer, Content } = Layout;
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import configureStore, { history } from "../redux/configureStore";

interface AppProps {}

const store = configureStore();

export const App = (props: AppProps) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
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
                            <Switch>
                                <Route
                                    exact={true}
                                    path="/home"
                                    component={WrapHomeImageGallery}
                                />
                                <Route
                                    exact={true}
                                    path="/home/add"
                                    component={AddHomeImage}
                                />
                                <Route
                                    exact={true}
                                    path="/"
                                    component={WrapTable}
                                />
                                <Route
                                    exact={true}
                                    path="/project/add"
                                    component={FormAddProject}
                                />
                            </Switch>
                        </Content>
                        <Footer>
                            <p>copyright © Loc</p>
                        </Footer>
                    </Layout>
                </Layout>
            </ConnectedRouter>
        </Provider>
    );
};
