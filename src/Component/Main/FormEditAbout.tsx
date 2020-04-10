import * as React from "react";
import "./style.scss";
import { Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";
const { TextArea } = Input;

export const FormEditAbout = () => {
    const [file, setFile] = React.useState({});

    const [inputValue, setInputValue] = React.useState(null);

    const [api, setApi] = React.useState({
        id: "",
        Title: " ",
        Description: "",
        created_at: "",
        updated_at: "",
        Image: [
            {
                id: "76",
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
        ],
    });

    function _handleImageChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setInputValue(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const onsubmit = (value) => {
        const newFile = [];
        newFile.push(file);
        value.Image = newFile;
        console.log(value);
        axios
            .put(`${API_URL}/about-info-project`, value)
            .then((res) => {
                alert("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        fetch(`${API_URL}/about-info-project`)
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
        <Row>
            <Col span={12}>
                <h2>{api.Title}</h2>
                <Form className="form-add-project" onFinish={onsubmit}>
                    <Form.Item label="Title" name="Title">
                        <Input key={api.Title} defaultValue={api.Title} />
                    </Form.Item>
                    <Form.Item label="Description" name="Description">
                        <Input
                            key={api.Description}
                            defaultValue={api.Description}
                        />
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
                                console.log(e.target.files[0]);
                                const formData = new FormData();
                                formData.append("files", e.target.files[0]);
                                axios
                                    .post(`${API_URL}/upload`, formData, {
                                        headers: {
                                            "Content-Type":
                                                "multipart/form-data",
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
                        {inputValue ? (
                            <img className="preview" src={inputValue} />
                        ) : (
                            <img
                                className="preview"
                                src={API_URL + api.Image[0].url}
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
