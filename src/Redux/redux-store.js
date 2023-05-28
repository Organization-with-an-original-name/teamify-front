import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

let reducers = combineReducers({
    user: userReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;