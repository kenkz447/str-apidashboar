import * as React from "react";
import { List } from "antd";
const data = ["Project", "About", "Contact", "Setting"];

export const Navigation = () => {
    return (
        <List
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <a href="">{item}</a>
                </List.Item>
            )}
        />
    );
};
