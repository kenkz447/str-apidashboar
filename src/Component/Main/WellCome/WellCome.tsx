import * as React from "react";
import { Row, Col, Card } from "antd";

export const WellCome = () => {
    document.title = "Dashboard";
    return (
        <Row gutter={[30, 30]}>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
            <Col span={6}>
                <div className="site-card-border-less-wrapper">
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};
