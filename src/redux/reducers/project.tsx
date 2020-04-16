import { combineReducers } from "redux";
import * as Store from "../store";

const Projectreducer = (
    state: Store.ItemProject[] = [],
    action: Store.ProjectReducer
) => {
    switch (action.type) {
        case "GET":
            return (state = action.states);
        case "ADD":
            return [...state, action.item];
        case "DELETE":
            return state.filter((o) => o.id !== action.item.id);
        default:
            return state;
    }
};

export const reducer = combineReducers<Store.StoreProject>({
    items: Projectreducer,
});
