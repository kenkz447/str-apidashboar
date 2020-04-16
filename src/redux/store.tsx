import { createStore, Action, applyMiddleware } from "redux";

import { deleteItemMiddleware, loggerMiddleware } from "./middleware/project";
import { reducer } from "./reducers/project";

import { reducerHome } from "./reducers/home";
import {
    loggerMiddlewareHome,
    deleteItemMiddlewareHome,
} from "./middleware/home";

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

export const storeProject = createStore(
    reducer,
    applyMiddleware(loggerMiddleware, deleteItemMiddleware)
);

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

export const storeHome = createStore(
    reducerHome,
    applyMiddleware(loggerMiddlewareHome, deleteItemMiddlewareHome)
);

/* =============================== export ===========================  */

export * from "./action/home";
export * from "./middleware/project";
export * from "./action/project";

/* =============================== router ===========================  */
