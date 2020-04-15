import "./style.scss";

import * as React from "react";
import { Menu, Dropdown, Input } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, GlobalOutlined, BellOutlined } from "@ant-design/icons";

const { Search } = Input;

const profile = () => {
    return (
        <Menu>
            <Menu.Item key="0">
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                onClick={() => {
                    function deleteAllCookies() {
                        var cookies = document.cookie.split(";");
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = cookies[i];
                            var eqPos = cookie.indexOf("=");
                            var name =
                                eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                            document.cookie =
                                name +
                                "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        }
                    }
                    deleteAllCookies();
                    window.location.reload(true);
                }}
                key="3"
            >
                <Link to="/">Logout</Link>
            </Menu.Item>
        </Menu>
    );
};

const language = () => {
    return (
        <Menu>
            <Menu.Item key="0">
                <Link to="/profile">VIET NAM</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <Link to="/">ENGLISH</Link>
            </Menu.Item>
        </Menu>
    );
};

export const Header = () => {
    return (
        <div className="header_dashboar">
            <Search
                placeholder="Search here !!!"
                onSearch={(value) => console.log(value)}
                style={{ width: 160, height: 27, lineHeight: "18px" }}
            />
            <Dropdown
                className="dropdown-header"
                overlay={<span></span>}
                trigger={["click"]}
            >
                <span
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    <BellOutlined style={{ fontSize: "16px" }} />
                </span>
            </Dropdown>
            <Dropdown
                className="dropdown-header"
                overlay={profile}
                trigger={["click"]}
            >
                <span
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    <UserOutlined style={{ fontSize: "16px" }} />
                    <span className="profile-dropdowni-title">Profile</span>
                </span>
            </Dropdown>
            <Dropdown
                className="dropdown-header"
                overlay={language}
                trigger={["click"]}
            >
                <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    <GlobalOutlined style={{ fontSize: "16px" }} />
                </a>
            </Dropdown>
        </div>
    );
};
