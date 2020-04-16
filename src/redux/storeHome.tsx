import { createStore, combineReducers, Action, applyMiddleware } from "redux";
import { API_URL, getCookie } from "../../config";
import { notification } from "antd";
import axios from "axios";

export interface Store {
    items: Item[];
}

export interface Item {
    id?: number;
    link?: string;
    image?: string;
    created_at?: string;
}

interface HomesReducer extends Action<"GET" | "ADD" | "UPDATE" | "DELETE"> {
    item?: Item;
    states?: Item[];
}

const HomesReducer = (state: Item[] = [], action: HomesReducer) => {
    switch (action.type) {
        case "GET":
            return (state = action.states);
        case "DELETE":
            return state.filter((o) => o.id !== action.item.id);
        default:
            return state;
    }
};

const reducers = combineReducers<Store>({
    items: HomesReducer,
});

const loggerMiddleware = (store) => {
    return (next) => {
        return (action) => {
            return next(action);
        };
    };
};

const deleteItemMiddleware = (store) => (next) => (action) => {
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

const reducer = combineReducers({
    items: HomesReducer,
});

export const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware, deleteItemMiddleware)
);

export const getApi = (states: Item[]) => ({
    type: "GET",
    states,
});

export const deleteItem = (item: Item): HomesReducer => ({
    type: "DELETE",
    item: item,
});
