import * as snackbarActions from "store/actionCreators/snackbar";
import { ActionType, StateType, getType } from "typesafe-actions";

const snackbarReducer = (
    state = {
        display: false,
        message: "",
        type: "success" as snackbarActions.SnackbarType
    },
    action: ActionType<typeof snackbarActions>
) => {
    switch (action.type) {
        case getType(snackbarActions.setSnackbarMessage):
            return {
                display: true,
                message: action.payload.message,
                type: action.payload.type
            };
        case getType(snackbarActions.removeSnackbarMessage):
            return {
                ...state,
                display: false,
                message: ""
            };
        default:
            return state;
    }
};

export default snackbarReducer;
export type SnackbarState = StateType<typeof snackbarReducer>;
