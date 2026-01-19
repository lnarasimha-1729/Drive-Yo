import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";

// Import your reducers
import { loginUserReducer, registerUserReducer } from "./reducers/UserReducers";

const finalReducer = combineReducers({
  registerUserReducer,
  loginUserReducer
});

const store = createStore(finalReducer, applyMiddleware(thunk));

export default store;
