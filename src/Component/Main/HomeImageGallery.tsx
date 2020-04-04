import "./style.scss";

import * as React from "react";
import { Table as TableANTD, Button } from "antd";
import { API_URL } from "../../../config";
import { Item, deleteItem, getApi } from "../../redux/storeHome";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

var moment = require("moment");

interface TableListProps {
    items: Item[];
    Deleteitem: (item: Item) => void;
    mapAllapitoprops: (item: Item[]) => void;
}

class HomeImageGallery extends React.Component<TableListProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch(`${API_URL}/homes`)
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    const newResult = [];
                    result.map(item => {
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
                                action_delete: API_URL + "/homes" + item.id
                            }
                        });
                    });
                    console.log(newResult, "new");
                    this.props.mapAllapitoprops(newResult);
                },
                error => {
                    console.log(error);
                }
            );
    }

    render() {
        const { items, Deleteitem } = this.props;

        return (
            <div className="table">
                <div className="table__wrap-button">
                    <Link to="/home/add">ADD NEW</Link>
                </div>
                <TableANTD
                    bordered
                    columns={[
                        {
                            title: "id",
                            dataIndex: "id"
                        },
                        {
                            title: "link",
                            dataIndex: "link"
                        },
                        {
                            title: "image",
                            key: "image",
                            dataIndex: "image",
                            render: e => <img src={API_URL + e} alt="" />
                        },
                        {
                            title: "Action",
                            key: "Action",
                            dataIndex: "action_delete",
                            render: action => (
                                <Button
                                    type="danger"
                                    onClick={() => {
                                        Deleteitem(action);
                                    }}
                                >
                                    Delete
                                </Button>
                            )
                        }
                    ]}
                    dataSource={items}
                    rowKey="id"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        mapAllapitoprops: item => {
            dispatch(getApi(item));
        },
        Deleteitem: item => {
            dispatch(deleteItem(item));
        }
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(HomeImageGallery);
