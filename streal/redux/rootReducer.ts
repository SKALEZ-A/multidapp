import { combineReducers } from "redux";
import InterfaceReducer from "./interface/interface-reducer";
import AuthReducer from "./auth/auth-reducer";

export const rootReducer = combineReducers({
  interface: InterfaceReducer,
  auth: AuthReducer,
});
