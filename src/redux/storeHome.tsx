import { createStore, combineReducers, Action, applyMiddleware } from "redux";
import { API_URL } from "../../config";
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
        case "ADD":
            return [...state, action.item];
        case "UPDATE":
            const UpdatingTodo = state.find(o => o.id === action.item.id);
            if (!UpdatingTodo) {
                return state;
            }
            UpdatingTodo.image = action.item.image;
            UpdatingTodo.link = action.item.link;
            return [...state];
        case "DELETE":
            return state.filter(o => o.id !== action.item.id);
        default:
            return state;
    }
};

const reducers = combineReducers<Store>({
    items: HomesReducer
});

const loggerMiddleware = store => {
    return next => {
        return action => {
            return next(action);
        };
    };
};

const postItemMiddleware = store => next => action => {
    if (action.type !== "ADD") {
        return next(action);
    }
    axios
        .post("http://localhost:3000/api/todos", action.todo)
        .then(o => {
            if (o.statusText == "OK") {
                next({
                    ...action,
                    todo: o.data
                });
            }
        })
        .catch(function(error) {
            alert(error);
        });
};

const deleteItemMiddleware = store => next => action => {
    if (action.type !== "DELETE") {
        return next(action);
    }
    console.log(action.item.id);

    axios
        .delete(`${API_URL}/homes/${action.item.id}`, {
            data: {
                id: action.item.id
            }
        })
        .then(o => {
            if (o.statusText == "OK") {
                next({
                    ...action,
                    item: action.item
                });
            }
        })
        .catch(function(error) {
            alert(error);
        });
};

const updateItemMiddleware = store => next => action => {
    if (action.type !== "UPDATE") {
        return next(action);
    }

    axios
        .put("http://localhost:3000/api/todos", action.todo)
        .then(o => {
            if (o.statusText == "OK") {
                next({
                    ...action,
                    todo: action.todo
                });
            }
        })
        .catch(function(error) {
            alert("UPDATE FAILED!");
        });
};

const reducer = combineReducers({
    items: HomesReducer
});

export const store = createStore(
    reducer,
    applyMiddleware(
        loggerMiddleware,
        postItemMiddleware,
        deleteItemMiddleware,
        updateItemMiddleware
    )
);

export const getApi = (states: Item[]) => ({
    type: "GET",
    states
});

export const addItem = (item: Item): HomesReducer => ({
    type: "ADD",
    item: item
});

export const updateItem = (item: Item): HomesReducer => ({
    type: "UPDATE",
    item: item
});

export const deleteItem = (item: Item): HomesReducer => ({
    type: "DELETE",
    item: item
});
