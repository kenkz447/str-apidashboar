import * as React from "react";
import { Table as TableANTD, Tag, Button } from "antd";
import { API_URL } from "../../../config";
import "./style.scss";
import { Item, deleteItem, getApi } from "../../redux/store";
import { connect } from "react-redux";
var moment = require("moment");

interface TableListProps {
    items: Item[];
    Deleteitem: (item: Item) => void;
    mapAllapitoprops: (item: Item[]) => void;
}

class Table extends React.Component<TableListProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        fetch(`${API_URL}/projects`)
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
                            title: item.Title,
                            description: item.Description,
                            action_delete: {
                                id: Number(item.id),
                                created_at: moment(item.updated_at).format(
                                    ",DD-MM-YYYY"
                                ),
                                title: item.Title,
                                description: item.Description,
                                action_delete: API_URL + "/projects" + item.id
                            }
                        });
                    });
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
            <div>
                <Button type="danger">ADD NEW</Button>
                <TableANTD
                    bordered
                    columns={[
                        {
                            title: "id",
                            dataIndex: "id"
                        },
                        {
                            title: "Title",
                            dataIndex: "title"
                        },
                        {
                            title: "Update_as",
                            dataIndex: "created_at"
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

export default connect(mapStateToProps, mapDispatchtoProps)(Table);
