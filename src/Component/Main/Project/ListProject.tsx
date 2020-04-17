import "../style.scss";

import * as React from "react";
import { Table as TableANTD, Button, Pagination } from "antd";
import { API_URL } from "../../../../config";
import { ItemProject, deleteItem, getApi } from "../../../redux/store";
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
    items: ItemProject[];
    Deleteitem: (item: ItemProject) => void;
    mapAllapitoprops: (item: ItemProject[]) => void;
}

interface IState {
    total?: number;
    page?: number;
}

class ListProject extends React.Component<TableListProps, IState> {
    constructor(props) {
        super(props);
        this.state = { total: 1, page: 1 };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        fetch(`${API_URL}/projects?_start=0&_limit=10`)
            .then((res) => res.json())
            .then((result) => {
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
            });

        fetch(`${API_URL}/projects/count`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({ ...this.state, total: result });
            });

        document.title = "All Project";
    }
    onChange(e) {
        fetch(`${API_URL}/projects?_start=${10 * (e - 1)}&_limit=10`)
            .then((res) => res.json())
            .then((result) => {
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
            });
    }

    render() {
        const { items, Deleteitem } = this.props;

        return (
            <div className="table">
                <div className="table__wrap-header">
                    <h3 className="table__wrap-header__title">
                        {document.title}
                    </h3>
                    <Link to="/project/add">ADD NEW</Link>
                </div>
                <TableANTD
                    bordered
                    pagination={false}
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
                            title: "Actions",
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
                                        danger
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
                <Pagination
                    defaultCurrent={1}
                    total={this.state.total}
                    onChange={this.onChange}
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
