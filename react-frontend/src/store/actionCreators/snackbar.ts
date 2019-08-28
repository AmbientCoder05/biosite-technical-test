import { SET_SNACKBAR_MESSAGE, REMOVE_SNACKBAR_MESSAGE } from "store/actions";
import { createStandardAction } from "typesafe-actions";

export type SnackbarType = "success" | "error";
export interface Snackbar {
    message: string;
    type: SnackbarType;
}

export const setSnackbarMessage = createStandardAction(
    SET_SNACKBAR_MESSAGE
).map((snackbar: Snackbar) => ({
    payload: snackbar
}));
export const removeSnackbarMessage = createStandardAction(
    REMOVE_SNACKBAR_MESSAGE
)();
