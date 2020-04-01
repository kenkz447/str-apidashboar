import { createStore, combineReducers, Action, applyMiddleware } from "redux";
import { API_URL } from "../../config";
import axios from "axios";

export interface Store {
    items: Item[];
}

export interface Item {
    id?: number;
    created_at?: string;
    image?: string;
    title?: boolean;
    description?: string;
    action_delete?: any;
}

interface ProjectReducer extends Action<"GET" | "ADD" | "UPDATE" | "DELETE"> {
    item?: Item;
    states?: Item[];
}

const Projectreducer = (state: Item[] = [], action: ProjectReducer) => {
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
            UpdatingTodo.title = action.item.title;
            return [...state];
        case "DELETE":
            return state.filter(o => o.id !== action.item.id);
        default:
            return state;
    }
};

const reducers = combineReducers<Store>({
    items: Projectreducer
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
    axios
        .delete(`${API_URL}/projects/${action.item.id}`, {
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
    items: Projectreducer
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

export const getApi = (states: Item[]): ProjectReducer => ({
    type: "GET",
    states
});

export const addItem = (item: Item): ProjectReducer => ({
    type: "ADD",
    item: item
});

export const updateItem = (item: Item): ProjectReducer => ({
    type: "UPDATE",
    item: item
});

export const deleteItem = (item: Item): ProjectReducer => ({
    type: "DELETE",
    item: item
});
