import * as Store from "../store";

export const HomesReducer = (
    state: Store.ItemHome[] = [],
    action: Store.HomesReducer
) => {
    switch (action.type) {
        case "GET":
            return (state = action.states);
        case "DELETE":
            return state.filter((o) => o.id !== action.item.id);
        default:
            return state;
    }
};
