import "@/Component/Main/style.scss";

import * as React from "react";
import { API_URL } from "@/../config.ts";
import { Button, Table as TableANTD, Pagination, Modal } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemHome, getApiHome, ItemHome } from "@/redux/store";
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
var moment = require("moment");

interface HomeImageGalleryProps {
    items: ItemHome[];
    Deleteitem: (item: ItemHome) => void;
    mapAllapitoprops: (item: ItemHome[]) => void;
}

interface IState {
    total?: number;
    page?: number;
}

class HomeImageGallery extends React.Component<HomeImageGalleryProps, IState> {
    constructor(props) {
        super(props);
        this.state = { total: 1, page: 1 };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        fetch(`${API_URL}/homes?_start=0&_limit=10`)
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
                        link: item.link,
                        action_delete: {
                            id: Number(item.id),
                            link: item.link,
                            created_at: moment(item.updated_at).format(
                                ",DD-MM-YYYY"
                            ),
                            action_delete: API_URL + "/homes" + item.id,
                        },
                    });
                });
                this.props.mapAllapitoprops(newResult);
            });

        fetch(`${API_URL}/homes/count`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({ ...this.state, total: result });
            });

        document.title = "All Home";
    }
    onChange(e) {
        fetch(`${API_URL}/homes?_start=${10 * (e - 1)}&_limit=10`)
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
                        link: item.link,
                        action_delete: {
                            id: Number(item.id),
                            link: item.link,
                            created_at: moment(item.updated_at).format(
                                ",DD-MM-YYYY"
                            ),
                            action_delete: API_URL + "/homes" + item.id,
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
                    <Link to="/home/add">ADD NEW</Link>
                </div>
                <TableANTD
                    key={this.state.page}
                    pagination={false}
                    bordered
                    columns={[
                        {
                            title: "link",
                            dataIndex: "link",
                        },
                        {
                            title: "image",
                            key: "image",
                            dataIndex: "image",
                            render: (e) => <img src={API_URL + e} alt="" />,
                        },
                        {
                            title: "Actions",
                            key: "Action",
                            dataIndex: "action_delete",
                            className: "action",
                            align: "right",
                            width: 130,
                            render: (action) => (
                                <>
                                    <Link
                                        className="ant-btn ant-btn-circle ant-btn-icon-only"
                                        to={"/home/edit/" + action.id}
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
        items: state.itemsHome,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        mapAllapitoprops: (item) => {
            dispatch(getApiHome(item));
        },
        Deleteitem: (item) => {
            dispatch(deleteItemHome(item));
        },
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(HomeImageGallery);
