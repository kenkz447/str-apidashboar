import * as React from "react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Table from "./Table";
export const WrapTable = () => {
    return (
        <Provider store={store}>
            <Table />
        </Provider>
    );
};
