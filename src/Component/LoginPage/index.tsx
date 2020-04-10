import * as React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { API_URL } from "../../../config";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const LoginPage = () => {
    const onFinish = (values) => {
        console.log(values);

        fetch(
            `${API_URL}/user-logers?username=${values.username}&password=${values.password}`
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.length > 0) {
                    alert(
                        `Hi ${result[0].name} You have successfully logged in`
                    );
                    const objectLoger = {
                        name: result[0].name,
                        Username: result[0].username,
                        email: result[0].email,
                    };
                    const set_cookie = (name, value) => {
                        document.cookie = name + "=" + value;
                    };
                    set_cookie(
                        "successfullyLogin",
                        JSON.stringify(objectLoger)
                    );
                    window.location.reload(true);
                } else {
                    alert("wrong username or password!!!!");
                }
            });
    };

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
                        name="username"
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

                    <Form.Item
                        {...tailLayout}
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
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
