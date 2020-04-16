import * as React from "react";
import { storeProject } from "../../../redux/store";
import { Provider } from "react-redux";
import ListProject from "./ListProject";
export const WrapListProject = () => {
    return (
        <Provider store={storeProject}>
            <ListProject />
        </Provider>
    );
};
