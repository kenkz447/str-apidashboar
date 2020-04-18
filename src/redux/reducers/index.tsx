import { combineReducers } from "redux";
import { HomesReducer } from "./home";
import { Projectreducer } from "./project";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        itemsHome: HomesReducer,
        itemsProject: Projectreducer,
    });

export interface State {
    router: RouterState;
}

export default rootReducer;
