import * as React from "react";
import { store } from "../../../redux/storeHome";
import { Provider } from "react-redux";
import HomeImageGallery from "./HomeImageGallery";
export const WrapHomeImageGallery = () => {
    return (
        <Provider store={store}>
            <HomeImageGallery />
        </Provider>
    );
};
