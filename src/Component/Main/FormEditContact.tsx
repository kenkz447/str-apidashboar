import * as React from "react";
import "./style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";
const { TextArea } = Input;

export const FormEditContact = () => {
    const [api, setApi] = React.useState({
        Title: "",
        Description: "",
        Address: "",
        Phone: "",
        Email: "",
        Fax: "",
    });

    const onsubmit = (value) => {
        axios
            .put(`${API_URL}/contact-info`, value)
            .then((res) => {
                alert("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        fetch(`${API_URL}/contact-info`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setApi(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <Form className="form-add-project" onFinish={onsubmit}>
            <Form.Item label="Title" name="Title">
                <Input key={api.Title} defaultValue={api.Title} />
            </Form.Item>

            <Form.Item label="Description" name="Description">
                <Input key={api.Description} defaultValue={api.Description} />
            </Form.Item>
            <Form.Item
                label="Address"
                name="Address"
                rules={[{ message: "Please input your Address!" }]}
            >
                <Input key={api.Address} defaultValue={api.Address} />
            </Form.Item>
            <Form.Item label="Phone" name="Phone">
                <Input key={api.Phone} defaultValue={api.Phone} />
            </Form.Item>
            <Form.Item label="Email" name="Email">
                <Input key={api.Email} defaultValue={api.Email} />
            </Form.Item>
            <Form.Item label="Fax" name="Fax">
                <Input key={api.Fax} defaultValue={api.Fax} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Edit
                </Button>
            </Form.Item>
        </Form>
    );
};
