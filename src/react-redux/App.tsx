import * as React from "react";
import { Layout } from "antd";
const { Sider, Header, Footer, Content } = Layout;

interface AppProps {}

export const App = (props: AppProps) => {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
