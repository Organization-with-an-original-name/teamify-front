import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import allusersReducer from "./allusersReducer";

let reducers = combineReducers({
    user: userReducer,
    allusers: allusersReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;