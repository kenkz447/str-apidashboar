import * as React from "react";
import "./style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";
const { TextArea } = Input;

export const EditProject = info => {
    const [file, setFile] = React.useState({});

    const [inputValue, setInputValue] = React.useState(null);

    function _handleImageChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setInputValue(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const onsubmit = value => {
        value.Image = file;
        console.log(value);
        axios
            .post(`${API_URL}/projects`, value)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Form className="form-add-project" onFinish={onsubmit}>
            <Form.Item
                label="Title"
                name="Title"
                rules={[
                    { required: true, message: "Please input your Title!" }
                ]}
            >
                <Input defaultValue={info.Title} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
                rules={[
                    {
                        required: true,
                        message: "Please input your Description!"
                    }
                ]}
            >
                <TextArea defaultValue={info.Description} />
            </Form.Item>
            <Form.Item
                label="Client"
                name="Client"
                rules={[
                    { required: true, message: "Please input your Client!" }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Share"
                name="Share"
                rules={[
                    { required: true, message: "Please input your Share!" }
                ]}
            >
                <Input defaultValue={info.Share} />
            </Form.Item>
            <Form.Item
                label="Share"
                name="Share"
                rules={[
                    { required: true, message: "Please input your Share!" }
                ]}
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
                    onChange={e => {
                        _handleImageChange(e);
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
