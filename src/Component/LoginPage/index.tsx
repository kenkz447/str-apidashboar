import "./style.scss";

import * as React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { API_URL } from "../../../config";
import axios from "axios";
import { useHistory } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const LoginPage = () => {
    const history = useHistory();
    function onFinish(values) {
        axios
            .post(`${API_URL}/auth/local`, {
                identifier: values.identifier,
                password: values.password,
            })
            .then((response) => {
                document.cookie = "auth=" + response.data.jwt;
                notification["success"]({
                    message: "Logged in successfully",
                    duration: 2,
                });
                history.push("/home");
            })
            .catch(() => {
                notification["error"]({
                    message: "Login failed",
                });
            });
    }
    return (
        <Row
            style={{
                backgroundImage:
                    "url(" + require("../../image/login.jpg") + ")",
            }}
            className="login-row"
            align="middle"
            justify="center"
        >
            <Col className="col-login" span={8}>
                <Form
                    className="form-login"
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="identifier"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
