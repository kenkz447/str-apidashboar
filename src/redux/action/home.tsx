import * as Store from "../store";

export const getApiHome = (states: Store.ItemHome[]) => ({
    type: "GET",
    states,
});

export const deleteItemHome = (item: Store.ItemHome): Store.HomesReducer => ({
    type: "DELETE",
    item: item,
});
