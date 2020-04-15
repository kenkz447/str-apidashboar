import * as React from "react";
import "../style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../../config";
const { TextArea } = Input;

export const FormEditContact = () => {
    document.title = "Contact";

    const [api, setApi] = React.useState([]);

    const onsubmit = (value) => {
        axios
            .put(`${API_URL}/contact`, value)
            .then((res) => {
                alert("success");
            })
            .catch((err) => {
                console.log(err);
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
                <Button type="primary" htmlType="submit">
                    Edit
                </Button>
            </Form.Item>
        </Form>
    );
};
