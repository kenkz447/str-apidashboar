import * as React from "react";
import "./style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";

export const AddHomeImage = () => {
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
        console.log(value);
        axios
            .post(`${API_URL}/homes`, value)
            .then((res) => {
                alert("success");
                form.resetFields();
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Form className="form-add-project" onFinish={onsubmit}>
            <Form.Item
                label="link"
                name="link"
                rules={[{ required: true, message: "Please input your link!" }]}
            >
                <Input />
            </Form.Item>

            <div className="input-file-container">
                <label className="button-select-file" id="myfile">
                    Add Image
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
                                },
                            })
                            .then((res) => {
                                setFile(res.data[0]);
                            })
                            .catch((err) => {
                                console.log(err);
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
