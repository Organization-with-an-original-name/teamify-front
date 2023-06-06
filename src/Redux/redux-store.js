import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import teamsReducer from "./teamsReducer";


let reducers = combineReducers({
    user: userReducer,
    teams: teamsReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;