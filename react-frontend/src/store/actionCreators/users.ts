import { RECEIVE_USERS, REQUEST_USERS } from "store/actions";
import { createStandardAction } from "typesafe-actions";
import { Dispatch } from "redux";

export interface CreateUser {
    firstName: string;
    lastName: string;
}

export interface User extends CreateUser {
    id: string;
    qualifications: Qualification[];
}

export interface Qualification {
    id: string;
    type: string;
    uniqueId: string | null;
    expiry: string | null;
}

export const requestUsers = createStandardAction(REQUEST_USERS)();
export const receivedUsers = createStandardAction(RECEIVE_USERS).map(
    (users: User[]) => ({
        payload: { users }
    })
);

export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
        dispatch(requestUsers());
        try {
            const res = await fetch("/api/users", {
                method: "GET"
            });
            const users = await res.json();
            dispatch(receivedUsers(users));
        } catch (err) {
            console.error(err);
        }
    };
};

export const createUser = async (user: CreateUser) => {
    const res = await fetch("/api/users/commands", {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.in.biosite.create-user+json"
        },
        body: JSON.stringify(user)
    });
    if (!res.ok) {
        throw new Error("Invalid request");
    }
};
