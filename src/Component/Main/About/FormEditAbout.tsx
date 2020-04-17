import * as React from "react";
import ".././style.scss";
import { Form, Input, Button, Row, Col, notification, Modal } from "antd";
import axios from "axios";
import { API_URL, getCookie } from "../../../../config";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;

export const FormEditAbout = () => {
    document.title = "About";
    const [file, setFile] = React.useState({});

    const [inputValue, setInputValues] = React.useState(null);

    const [defaulValues, setDefaulVales] = React.useState([]);

    const [api, setApi] = React.useState({
        id: "",
        Title: " ",
        Description: "",
        created_at: "",
        updated_at: "",
        Image: {
            id: "",
            name: "",
            hash: "",
            sha256: "",
            ext: "",
            mime: "",
            size: "",
            url: "",
            provider: "",
            provider_metadata: null,
            created_at: "",
            updated_at: "",
        },
    });

    function _handleImageChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setInputValues(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const onsubmit = (value) => {
        const newFile = [];
        newFile.push(file);
        value.Image = newFile;
        confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                axios
                    .put(`${API_URL}/about`, value, {
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
        fetch(`${API_URL}/about`)
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
                        }
                    );
                    setDefaulVales(newResult);
                    setApi(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <Row>
            <Col span={24}>
                <div className="table__wrap-header">
                    <h3 className="table__wrap-header__title">
                        {document.title}
                    </h3>
                </div>
                <Form
                    fields={defaulValues}
                    className="form-add-project"
                    onFinish={onsubmit}
                >
                    <Form.Item label="Title" name="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="Description">
                        <Input />
                    </Form.Item>
                    <div className="input-file-container">
                        <label className="button-select-file" id="myfile">
                            Upload Image
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
                                            Authorization: `Bearer ${getCookie()}`,
                                        },
                                    })
                                    .then((res) => {
                                        notification.open({
                                            message: "Upload success",
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
                            <img
                                className="preview"
                                src={API_URL + api.Image.url}
                            />
                        )}
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
