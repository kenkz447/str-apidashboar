import * as React from "react";
import "@/Component/Main/style.scss";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { API_URL, getCookie } from "@/../config.ts";
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
        <div>
            <div className="table__wrap-header">
                <h3 className="table__wrap-header__title">{document.title}</h3>
            </div>
            <Form form={form} className="form-add-project" onFinish={onsubmit}>
                <Form.Item
                    label="Link"
                    name="link"
                    rules={[
                        { required: true, message: "Please input your link!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Image">
                    <div className="input-file-container">
                        <label className="ant-btn" id="myfile">
                            Select Image
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
                                            "Content-Type":
                                                "multipart/form-data",
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
                            required
                        />
                        {inputValue && (
                            <img className="preview" src={inputValue} />
                        )}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button
                        className="button_submiit"
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
