import * as React from "react";
import { Row, Col } from "antd";

export const WellCome = () => {
    document.title = "Dashboard";
    return (
        <Row>
            <Col>
                <h1>Hello Lộc, how are you feeling today!!! </h1>
            </Col>
        </Row>
    );
};
