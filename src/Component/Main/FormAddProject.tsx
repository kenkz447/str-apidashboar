import * as React from "react";
import "./style.scss";
import { Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const FormAddProject = () => {
    const [file, setFile] = React.useState({});

    const onsubmit = e => {
        console.log(file);
    };
    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onsubmit}
        >
            <Input
                onChange={e => {
                    const formData = new FormData();
                    formData.append("files", e.target.files[0]);
                    axios
                        .post(`${API_URL}/upload`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        .then(res => {
                            setFile(res.data[0]);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }}
                type="file"
            />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
