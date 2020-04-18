import "./style.scss";
import * as React from "react";
import { Form, Input, Button, notification } from "antd";
import { API_URL, layout, tailLayout } from "@/../config.ts";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
        <div
            style={{
                backgroundImage: "url(" + require("@/image/login.jpg") + ")",
            }}
            className="login-row"
        >
            <div className="col-login">
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
            </div>
        </div>
    );
};
