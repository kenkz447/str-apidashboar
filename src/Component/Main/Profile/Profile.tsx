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
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">
                        {data.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {data.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Create at">
                        {moment(data.created_at).format("DD-MM-YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );
};
