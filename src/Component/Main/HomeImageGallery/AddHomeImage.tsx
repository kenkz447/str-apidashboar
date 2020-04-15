import * as React from "react";
import "../style.scss";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { API_URL, getCookie } from "../../../../config";
import { useHistory } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

export const AddHomeImage = () => {
    document.title = "Add Home";

    const history = useHistory();

    const [file, setFile] = React.useState({});

    const [form] = Form.useForm();

    const [inputValue, setInputValue] = React.useState(null);

    function _handleImageChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setInputValue(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const onsubmit = (value) => {
        value.Image = file;
        axios
            .post(`${API_URL}/homes`, value, {
                headers: {
                    Authorization: `Bearer ${getCookie()}`,
                },
            })
            .then((res) => {
                history.push("/home");
                notification.open({
                    message: "success",
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
                form.resetFields();
            });
    };

    return (
        <Form form={form} className="form-add-project" onFinish={onsubmit}>
            <Form.Item
                label="Link"
                name="link"
                rules={[{ required: true, message: "Please input your link!" }]}
            >
                <Input />
            </Form.Item>
            <div className="input-file-container">
                <label className="button-select-file" id="myfile">
                    Upload image
                </label>
                <Input
                    className="input-file"
                    id="myfile"
                    onChange={(e) => {
                        _handleImageChange(e);
                        const formData = new FormData();
                        formData.append("files", e.target.files[0]);
                        axios
                            .post(`${API_URL}/upload`, formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${getCookie()}`,
                                },
                            })
                            .then((res) => {
                                notification.open({
                                    message: "upload success",
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
                                setFile(res.data[0]);
                            })
                            .catch((err) => {
                                notification["error"]({
                                    message: "Upload faild",
                                });
                            });
                    }}
                    type="file"
                />
                {inputValue && <img className="preview" src={inputValue} />}
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
