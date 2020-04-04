import * as React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";

const data = [
    {
        text: "Home",
        to: "/home"
    },
    {
        text: "Project",
        to: "/"
    },

    {
        text: "About",
        to: "/about"
    },
    {
        text: "Contact",
        to: "/contact"
    },
    {
        text: "Setting",
        to: "/setting"
    }
];

export const Navigation = () => {
    return (
        <List
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Link to={item.to}>{item.text}</Link>
                </List.Item>
            )}
        />
    );
};
