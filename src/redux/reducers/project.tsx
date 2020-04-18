import * as Store from "../store";

export const Projectreducer = (
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
