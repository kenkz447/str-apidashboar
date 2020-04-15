import * as React from "react";
import { Table as TableANTD, Tag, Button } from "antd";
import { API_URL } from "../../../../config";
import "../style.scss";
import { Item, deleteItem, getApi } from "../../../redux/store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal, notification } from "antd";
const { confirm } = Modal;

var moment = require("moment");

interface TableListProps {
    items: Item[];
    Deleteitem: (item: Item) => void;
    mapAllapitoprops: (item: Item[]) => void;
}

class ListProject extends React.Component<TableListProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch(`${API_URL}/projects`)
            .then((res) => res.json())
            .then(
                (result) => {
                    const newResult = [];
                    result.map((item) => {
                        return newResult.push({
                            id: Number(item.id),
                            created_at: moment(item.updated_at).format(
                                "DD-MM-YYYY"
                            ),
                            image: item.Image.url,
                            title: item.Title,
                            description: item.Description,
                            action_delete: {
                                id: Number(item.id),
                                created_at: moment(item.updated_at).format(
                                    ",DD-MM-YYYY"
                                ),
                                title: item.Title,
                                description: item.Description,
                                action_delete: API_URL + "/projects" + item.id,
                            },
                        });
                    });
                    this.props.mapAllapitoprops(newResult);
                },
                (error) => {
                    console.log(error);
                }
            );
        document.title = "All Project";
    }

    render() {
        const { items, Deleteitem } = this.props;

        return (
            <div className="table">
                <div className="table__wrap-button">
                    <Link to="/project/add">ADD NEW</Link>
                </div>
                <TableANTD
                    bordered
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                        },
                        {
                            title: "Created At",
                            dataIndex: "created_at",
                        },
                        {
                            title: "image",
                            key: "image",
                            dataIndex: "image",
                            render: (e) => <img src={API_URL + e} alt="" />,
                        },
                        {
                            className: "action",
                            title: "Action",
                            key: "Action",
                            dataIndex: "action_delete",
                            render: (action) => (
                                <>
                                    <Link
                                        className="ant-btn ant-btn-circle ant-btn-icon-only"
                                        to={"/project/edit/" + action.id}
                                    >
                                        <EditOutlined />
                                    </Link>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        size="middle"
                                        shape="circle"
                                        onClick={() => {
                                            confirm({
                                                title: "Are you sure ?",
                                                icon: (
                                                    <ExclamationCircleOutlined />
                                                ),
                                                onOk() {
                                                    Deleteitem(action);
                                                },
                                                onCancel() {},
                                            });
                                        }}
                                    />
                                </>
                            ),
                        },
                    ]}
                    dataSource={items}
                    rowKey="id"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        mapAllapitoprops: (item) => {
            dispatch(getApi(item));
        },
        Deleteitem: (item) => {
            dispatch(deleteItem(item));
        },
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ListProject);
