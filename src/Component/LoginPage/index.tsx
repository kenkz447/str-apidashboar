import * as React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { API_URL } from "../../../config";
import axios from "axios";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const LoginPage = () => {
    function onFinish(values) {
        axios
            .post("http://localhost:1337/auth/local", {
                identifier: values.identifier,
                password: values.password,
            })
            .then((response) => {
                document.cookie = response.data.jwt;
                notification["success"]({
                    message: "Logged in successfully",
                });
                window.location.reload(true);
            })
            .catch(() => {
                notification["error"]({
                    message: "Login failed",
                    description: "Wrong username or password !!!",
                });
            });
    }
    return (
        <Row className="login-row" align="middle" justify="center">
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
