import { ItemHome, HomesReducer } from "../store";

export const getApiHome = (states: ItemHome[]) => ({
    type: "GET",
    states,
});

export const deleteItemHome = (item: ItemHome): HomesReducer => ({
    type: "DELETE",
    item: item,
});
