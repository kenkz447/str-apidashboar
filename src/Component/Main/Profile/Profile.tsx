import * as React from "react";
import { Row, Col, Descriptions } from "antd";
import { API_URL, getCookie } from "../../../../config";
var moment = require("moment");

export const Profile = () => {
    const [data, setData] = React.useState({
        created_at: "2020-04-14T06:52:38.549Z",
        email: "dovanloc2466@gmail.com",
        username: "dovanloc",
    });
    React.useEffect(() => {
        document.title = "Profile";
        async function postData() {
            const response = await fetch(`${API_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie()}`,
                },
            });
            return response.json();
        }
        postData().then((e) => {
            setData(e);
        });
    }, []);
    return (
        <Row>
            <Col>
                <div>
                    <div className="table__wrap-header">
                        <h3 className="table__wrap-header__title">
                            {document.title}
                        </h3>
                    </div>
                    <Descriptions
                        className="form-add-project"
                        title="User Info"
                    >
                        <Descriptions.Item label="UserName">
                            {data.username}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {data.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Create at">
                            {moment(data.created_at).format("DD-MM-YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Remark">
                            empty
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Col>
        </Row>
    );
};
