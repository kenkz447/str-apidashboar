import { ItemProject, ProjectReducer } from "../store";

export const getApi = (states: ItemProject[]) => ({
    type: "GET",
    states,
});

export const deleteItem = (item: ItemProject): ProjectReducer => ({
    type: "DELETE",
    item: item,
});
