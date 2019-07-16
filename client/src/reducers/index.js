import { combineReducers } from "redux";
import authReducers from "./authReducer";
import errorReducers from "./errorReducer";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers
});
