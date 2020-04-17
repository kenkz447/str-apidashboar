import * as React from "react";
import "../style.scss";
import { Form, Input, Button, notification, Modal } from "antd";
import axios from "axios";
import { API_URL, getCookie } from "../../../../config";
import { useHistory } from "react-router-dom";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export const EditHomeImage = (match) => {
    const [file, setFile] = React.useState({});

    const [inputValue, setInputValue] = React.useState(null);

    const [defaultValue, setDefaultValue] = React.useState([]);

    const [api, setApi] = React.useState([
        {
            id: 43,
            image: "",
            link: "",
        },
    ]);

    const history = useHistory();

    const id = match.match.params.id;

    React.useEffect(() => {
        fetch(`${API_URL}/homes?id_in= ${id}`)
            .then((res) => res.json())
            .then((result) => {
                const newResult = [];
                const newResult2 = [];
                result.map((item) => {
                    return newResult.push({
                        id: Number(item.id),
                        image: item.Image.url,
                        link: item.link,
                    });
                });
                setFile(result[0].Image);
                document.title = `Edit ${newResult[0].Title}`;
                result.map((item) => {
                    return newResult2.push({
                        touched: true,
                        validating: false,
                        errors: [],
                        name: ["link"],
                        value: item.link,
                    });
                });
                setApi(newResult);
                setDefaultValue(newResult2);
            });
    }, []);

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
        confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                axios
                    .put(`${API_URL}/homes/${id}`, value, {
                        headers: {
                            Authorization: `Bearer ${getCookie()}`,
                        },
                    })
                    .then((res) => {
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
                        history.push("/home");
                    });
            },
            onCancel() {},
        });
    };

    return (
        <div>
            <div className="table__wrap-header">
                <h3 className="table__wrap-header__title">{document.title}</h3>
            </div>
            <Form
                fields={defaultValue}
                className="form-add-project"
                onFinish={onsubmit}
            >
                <Form.Item
                    label="link"
                    name="link"
                    rules={[
                        { required: true, message: "Please input your link!" },
                    ]}
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
        </div>
    );
};
