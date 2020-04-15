import * as React from "react";
import { store } from "../../../redux/store";
import { Provider } from "react-redux";
import Table from "./ListProject";
export const WrapListProject = () => {
    return (
        <Provider store={store}>
            <Table />
        </Provider>
    );
};
