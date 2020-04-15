import * as React from "react";
import {
    FormAddProject,
    Profile,
    AddHomeImage,
    EditHomeImage,
    EditProject,
    FormEditAbout,
    FormEditContact,
    WrapHomeImageGallery,
    WrapListProject,
    WellCome,
    NoMatch,
} from "../Main";
import { Route, Switch } from "react-router";

interface RoutesProps {}

export const Routes = (props: RoutesProps) => {
    return (
        <Switch>
            <Route exact={true} path="/" component={WellCome} />
            <Route exact={true} path="/home" component={WrapHomeImageGallery} />
            <Route exact={true} path="/home/add" component={AddHomeImage} />
            <Route exact={true} path="/project" component={WrapListProject} />
            <Route
                exact={true}
                path="/project/add"
                component={FormAddProject}
            />
            <Route
                exact={true}
                path="/project/edit/:id"
                component={EditProject}
            />
            <Route
                exact={true}
                path="/home/edit/:id"
                component={EditHomeImage}
            />
            <Route exact={true} path="/contact" component={FormEditContact} />
            <Route exact={true} path="/about" component={FormEditAbout} />
            <Route exact={true} path="/profile" component={Profile} />
            <Route path="*" component={NoMatch} />
        </Switch>
    );
};
