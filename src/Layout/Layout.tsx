import * as React from "react";
import { Layout } from "antd";
import { Navigation } from "../Component/Navigation";
import { Header as HeaderChild } from "../Component/Header/Header";
import {
    FormAddProject,
    Profile,
    AddHomeImage,
    EditHomeImage,
    EditProject,
    FormEditAbout,
    FormEditContact,
    WrapHomeImageGallery,
    WrapTable,
} from "../Component/Main/";

const { Sider, Header, Footer, Content } = Layout;
import { Provider } from "react-redux";
import { LoginPage } from "../Component/LoginPage";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import configureStore, { history } from "../redux/configureStore";

interface AppProps {}

const store = configureStore();

export const App = (props: AppProps) => {
    const [showLoginPage, setShowLoginPage] = React.useState(true);
    React.useEffect(() => {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    setShowLoginPage(false);
                    return c.substring(name.length, c.length);
                }
            }
            setShowLoginPage(true);
            return "";
        }
        getCookie("successfullyLogin");
        console.log(showLoginPage, "áđá");
    }, []);
    console.log(showLoginPage);

    if (showLoginPage) {
        return <LoginPage />;
    }
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
                                <Route
                                    exact={true}
                                    path="/project/edit/:id"
                                    component={EditProject}
                                />
                                <Route
                                    exact={true}
                                    path="/homes/edit/:id"
                                    component={EditHomeImage}
                                />
                                <Route
                                    exact={true}
                                    path="/contact"
                                    component={FormEditContact}
                                />
                                <Route
                                    exact={true}
                                    path="/about"
                                    component={FormEditAbout}
                                />
                                <Route
                                    exact={true}
                                    path="/profile"
                                    component={Profile}
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
