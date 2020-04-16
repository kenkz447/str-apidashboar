import * as Store from "../store";

export const getApi = (states: Store.ItemProject[]) => ({
    type: "GET",
    states,
});

export const deleteItem = (item: Store.ItemProject): Store.ProjectReducer => ({
    type: "DELETE",
    item: item,
});
