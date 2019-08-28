import * as userActions from "store/actionCreators/users";
import { ActionType, StateType, getType } from "typesafe-actions";

const usersReducer = (
    state = { loading: false, users: [] as userActions.User[] },
    action: ActionType<typeof userActions>
) => {
    switch (action.type) {
        case getType(userActions.requestUsers):
            return { ...state, loading: true };
        case getType(userActions.receivedUsers):
            return { ...state, loading: false, users: action.payload.users };
        default:
            return state;
    }
};

export default usersReducer;
export type UsersState = StateType<typeof usersReducer>;
