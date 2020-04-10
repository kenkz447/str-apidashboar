import * as React from "react";
import "./style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";
const { TextArea } = Input;

export const EditProject = (match) => {
    const [file, setFile] = React.useState({});

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

    const getID = match.match.params.id;

    const id = Number(getID.substr(1, 99));

    React.useEffect(() => {
        fetch(`${API_URL}/projects?id_in= ${id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    const newResult = [];
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
                    setApi(newResult);
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
    console.log(id);

    const onsubmit = (value) => {
        value.Image = file;
        console.log(value);
        axios
            .put(`${API_URL}/projects/${id}`, value)
            .then((res) => {
                alert("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Form className="form-add-project" onFinish={onsubmit}>
            <Form.Item
                label="Title"
                name="Title"
                rules={[
                    { required: true, message: "Please input your Title!" },
                ]}
            >
                <Input key={api[0]?.Title} defaultValue={api[0]?.Title} />
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
                <Input.TextArea
                    key={api[0]?.Title}
                    defaultValue={api[0]?.Title}
                >
                    {"ádá"}
                </Input.TextArea>
            </Form.Item>
            <Form.Item
                label="Client"
                name="Client"
                rules={[
                    { required: true, message: "Please input your Client!" },
                ]}
            >
                <Input key={api[0]?.Client} defaultValue={api[0]?.Client} />
            </Form.Item>
            <Form.Item
                label="Share"
                name="Share"
                rules={[
                    { required: true, message: "Please input your Share!" },
                ]}
            >
                <Input key={api[0]?.Share} defaultValue={api[0]?.Share} />
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
