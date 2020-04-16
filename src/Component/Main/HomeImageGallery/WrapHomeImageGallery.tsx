import * as React from "react";
import { storeHome } from "../../../redux/store";
import { Provider } from "react-redux";
import HomeImageGallery from "./HomeImageGallery";
export const WrapHomeImageGallery = () => {
    return (
        <Provider store={storeHome}>
            <HomeImageGallery />
        </Provider>
    );
};
