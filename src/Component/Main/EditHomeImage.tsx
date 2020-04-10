import * as React from "react";
import "./style.scss";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { API_URL } from "../../../config";

export const EditHomeImage = (match) => {
    const [file, setFile] = React.useState({});

    const [inputValue, setInputValue] = React.useState(null);

    const [api, setApi] = React.useState([
        {
            id: 43,
            image: "",
            link: "",
        },
    ]);

    const getID = match.match.params.id;

    const id = Number(getID.substr(1, 99));

    React.useEffect(() => {
        fetch(`${API_URL}/homes?id_in= ${id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    const newResult = [];
                    result.map((item) => {
                        return newResult.push({
                            id: Number(item.id),
                            image: item.Image.url,
                            link: item.link,
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

    const onsubmit = (value) => {
        value.Image = file;
        console.log(value);
        axios
            .put(`${API_URL}/homes/${id}`, value)
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
                        console.log(e.target.files[0]);
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
