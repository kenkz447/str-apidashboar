import axios from "axios";
import { API_URL, getCookie } from "../../../config";
import { notification } from "antd";
export const loggerMiddlewareHome = (store) => {
    return (next) => {
        return (action) => {
            return next(action);
        };
    };
};

export const deleteItemMiddlewareHome = (store) => (next) => (action) => {
    if (action.type !== "DELETE") {
        return next(action);
    }

    axios
        .delete(`${API_URL}/homes/${action.item.id}`, {
            data: {
                id: action.item.id,
            },
            headers: {
                Authorization: `Bearer ${getCookie()}`,
            },
        })
        .then((o) => {
            next({
                ...action,
                item: action.item,
            });
            notification["success"]({
                message: "complete",
                duration: 2,
            });
        })
        .catch(function (error) {
            alert(error);
        });
};
