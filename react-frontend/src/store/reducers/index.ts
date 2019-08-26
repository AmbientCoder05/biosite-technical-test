import { StateType } from "typesafe-actions";
import { combineReducers } from "redux";

import snackbar from "./snackbar";
import users from "./users";

const rootReducer = combineReducers({
    snackbar,
    users
});
export default rootReducer;
export type RootState = StateType<typeof rootReducer>;
