import * as React from "react";
import "../style.scss";
import { Form, Input, Button, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL, getCookie } from "../../../../config";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { confirm } = Modal;

export const EditProject = (match) => {
    const [file, setFile] = React.useState({});
    let history = useHistory();
    const [inputValue, setInputValue] = React.useState(null);

    const [api, setApi] = React.useState([
        {
            id: 43,
            image: "",
            Title: "",
            Description: "",
            Client: "",
            Share: "",
        },
    ]);

    const [defaultValue, setDefaultValue] = React.useState([]);

    const id = match.match.params.id;

    [
        {
            touched: true,
            validating: false,
            errors: [],
            name: ["username"],
            value: "Ant Design",
        },
    ];

    React.useEffect(() => {
        fetch(`${API_URL}/projects?id_in= ${id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    const newResult = [];
                    const newResult2 = [];
                    result.map((item) => {
                        return newResult.push({
                            id: Number(item.id),
                            image: item.Image.url,
                            link: item.link,
                            Title: item.Title,
                            Description: item.Description,
                            Client: item.Client,
                            Share: item.Share,
                        });
                    });
                    result.map((item) => {
                        return newResult2.push(
                            {
                                touched: true,
                                validating: false,
                                errors: [],
                                name: ["Title"],
                                value: item.Title,
                            },
                            {
                                touched: true,
                                validating: false,
                                errors: [],
                                name: ["Description"],
                                value: item.Description,
                            },
                            {
                                touched: true,
                                validating: false,
                                errors: [],
                                name: ["Client"],
                                value: item.Client,
                            },
                            {
                                touched: true,
                                validating: false,
                                errors: [],
                                name: ["Share"],
                                value: item.Share,
                            }
                        );
                    });
                    setApi(newResult);
                    setDefaultValue(newResult2);
                    setFile(result[0].Image);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    function _handleImageChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setInputValue(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function showConfirm(value) {
        confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                value.Image = file;
                axios
                    .put(`${API_URL}/projects/${id}`, value, {
                        headers: {
                            Authorization: `Bearer ${getCookie()}`,
                        },
                    })
                    .then((res) => {
                        history.push("/project");
                        notification["success"]({
                            message: "Edit success",
                            duration: 2,
                        });
                    });
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 150);
                }).catch(() => console.log("Oops errors!"));
            },
            onCancel() {},
        });
    }

    return (
        <Form
            fields={defaultValue}
            className="form-add-project"
            onFinish={showConfirm}
        >
            <Form.Item
                label="Title"
                name="Title"
                rules={[
                    { required: true, message: "Please input your Title!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
                rules={[
                    {
                        required: true,
                        message: "Please input your Description!",
                    },
                ]}
            >
                <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item
                label="Client"
                name="Client"
                rules={[
                    { required: true, message: "Please input your Client!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Share"
                name="Share"
                rules={[
                    { required: true, message: "Please input your Share!" },
                ]}
            >
                <Input />
            </Form.Item>

            <div className="input-file-container">
                <label className="button-select-file" id="myfile">
                    Edit
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
                                setFile(res.data[0]);
                            });
                    }}
                    type="file"
                />

                {inputValue ? (
                    <img className="preview" src={inputValue} />
                ) : (
                    <img className="preview" src={API_URL + api[0].image} />
                )}
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
