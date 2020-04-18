import * as React from "react";
import "@/Component/Main/style.scss";
import { Form, Input, Button, Modal, notification } from "antd";
import axios from "axios";
import { API_URL, getCookie, layout, tailLayout } from "@/../config.ts";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export const FormEditContact = () => {
    document.title = "Contact";

    const [api, setApi] = React.useState([]);

    const onsubmit = (value) => {
        confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                axios
                    .put(`${API_URL}/contact`, value, {
                        headers: {
                            Authorization: `Bearer ${getCookie()}`,
                        },
                    })
                    .then((res) => {
                        notification.open({
                            message: "Edit success",
                            icon: (
                                <CheckCircleOutlined
                                    style={{
                                        color: "#28a745",
                                        fontSize: "13px",
                                    }}
                                />
                            ),
                            duration: 1.5,
                        });
                    });
            },
            onCancel() {},
        });
    };

    React.useEffect(() => {
        fetch(`${API_URL}/contact`)
            .then((res) => res.json())
            .then(
                (result) => {
                    const newResult = [];
                    newResult.push(
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Title"],
                            value: result.Title,
                        },
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Description"],
                            value: result.Description,
                        },
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Address"],
                            value: result.Address,
                        },
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Phone"],
                            value: result.Phone,
                        },
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Email"],
                            value: result.Email,
                        },
                        {
                            touched: true,
                            validating: false,
                            errors: [],
                            name: ["Fax"],
                            value: result.Fax,
                        }
                    );
                    setApi(newResult);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <div>
            <div className="table__wrap-header">
                <h3 className="table__wrap-header__title">{document.title}</h3>
            </div>
            <Form fields={api} className="form-add-project" onFinish={onsubmit}>
                <Form.Item label="Title" name="Title">
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="Description">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ message: "Please input your Address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name="Phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Fax" name="Fax">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        className="button_submiit"
                        type="primary"
                        htmlType="submit"
                    >
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
