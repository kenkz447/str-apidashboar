import { createStore, Action, applyMiddleware } from "redux";
import { deleteItemMiddleware, loggerMiddleware } from "./middleware/project";
import {
    loggerMiddlewareHome,
    deleteItemMiddlewareHome,
} from "./middleware/home";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers/index";

/* =============================== project ===========================  */

export interface StoreProject {
    items: ItemProject[];
}

export interface ItemProject {
    id?: number;
    created_at?: string;
    image?: string;
    title?: string;
    description?: string;
    action_delete?: any;
    client?: string;
    share?: string;
}

export interface ProjectReducer extends Action<"GET" | "ADD" | "DELETE"> {
    item?: ItemProject;
    states?: ItemProject[];
}

/* =============================== Home ===========================  */

export interface StoreHome {
    itemsHome: ItemHome[];
}

export interface ItemHome {
    id?: number;
    link?: string;
    image?: string;
    created_at?: string;
}

export interface HomesReducer extends Action<"GET" | "ADD" | "DELETE"> {
    item?: ItemHome;
    states?: ItemHome[];
}

/* =============================== export ===========================  */

export const history = createBrowserHistory();

export const store = createStore(
    createRootReducer(history),
    applyMiddleware(
        routerMiddleware(history),
        loggerMiddlewareHome,
        deleteItemMiddlewareHome,
        loggerMiddleware,
        deleteItemMiddleware
    )
);

export * from "./action/home";
export * from "./action/project";
