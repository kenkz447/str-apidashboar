import "./style.scss";
import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "antd";
const { SubMenu } = Menu;

export const Navigation = () => {
    const [defaultOpenKeys, setDefaultOpenKeys] = React.useState("");
    const [key, setKey] = React.useState("");
    const location = useLocation().pathname;
    const removeFirstSlash = location.substr(1, 999);

    React.useEffect(() => {
        if (removeFirstSlash.search("/") > 0) {
            setDefaultOpenKeys(
                removeFirstSlash.substr(0, removeFirstSlash.search("/"))
            );
        } else {
            setDefaultOpenKeys(removeFirstSlash);
        }
        setKey(document.title);
    });

    const data = [
        {
            SubMenuKey: "home",
            NavLink: [
                { key: "All Home", link: "/home" },
                { key: "Add Home", link: "/home/add" },
            ],
        },
        {
            SubMenuKey: "project",
            NavLink: [
                { key: "All Project", link: "/project" },
                { key: "Add Project", link: "/project/add" },
            ],
        },
        {
            NavLink: [{ key: "Contact", link: "/contact" }],
        },
        {
            NavLink: [{ key: "About", link: "/about" }],
        },
    ];
    console.log(key);
    return (
        <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={[key]}
            defaultOpenKeys={[defaultOpenKeys]}
            mode="inline"
            key={key}
        >
            {data.map((items) => {
                if (items.SubMenuKey) {
                    return (
                        <SubMenu
                            key={items.SubMenuKey}
                            title={
                                <span>
                                    <span>{items.SubMenuKey}</span>
                                </span>
                            }
                        >
                            {items.NavLink.map((item) => {
                                return (
                                    <Menu.Item key={item.key}>
                                        <NavLink
                                            className="navigation-nav--item"
                                            activeClassName="selected"
                                            to={item.link}
                                        >
                                            {item.key}
                                        </NavLink>
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    );
                }
                return items.NavLink.map((item) => {
                    return (
                        <Menu.Item key={item.key}>
                            <NavLink
                                className="navigation-nav--item"
                                activeClassName="selected"
                                to={item.link}
                            >
                                {item.key}
                            </NavLink>
                        </Menu.Item>
                    );
                });
            })}
        </Menu>
    );
};
