import { combineReducers } from "redux";
import { waiterReducer } from "redux-waiters";
import appReducer from "./app";
import userReducer from "./user";
import counterReducer from "./counter";
import loginReducer from "./login";

export default combineReducers({
  waiter: waiterReducer,
  counter: counterReducer,
  login: loginReducer,
  user: userReducer,
  app: appReducer,
});
