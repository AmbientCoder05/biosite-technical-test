import { Injectable } from "injection-js";
import { flatMap, groupBy } from "lodash";
import * as moment from "moment";
import * as uuid from "uuid";
import { Qualification, User } from "./user-repository.service";

@Injectable()
export class UserMerger {
    public merge(users: User[]): User {
        if (!users.length) {
            throw new Error("No users provided");
        }
        return users.reduce(
            (acc, user) => {
                if (!acc.id) {
                    return user;
                } else {
                    return {
                        firstName: this.mergeNames(
                            acc.firstName,
                            user.firstName
                        ),
                        lastName: this.mergeNames(acc.lastName, user.lastName),
                        id: uuid(),
                        qualifications: this.mergeQualifications(
                            acc.qualifications.concat(user.qualifications)
                        )
                    };
                }
            },
            {
                id: "",
                firstName: "",
                lastName: "",
                qualifications: []
            }
        );
    }

    /**
     * Merges qualifications together based on uniqueId and expiry.
     * @param qualifications Array of qualification objects.
     * @return The merged qualifications array.
     */
    private mergeQualifications(
        qualifications: Qualification[]
    ): Qualification[] {
        return flatMap(Object.values(
            groupBy(qualifications, "uniqueId")
        ), qualifications => {
            return qualifications.reduce(
                (acc, qualification) => {

                    // Get the latest date for the current qualification type.
                    const latest = qualifications
                        .filter(q => q.type === qualification.type)
                        .map(q => moment(q.expiry || ""))
                        .reduce((prev, curr) => {
                            return prev.isBefore(curr) ? curr : prev;
                        });

                    // Test if there is a dupe.
                    const dupe = acc.find(
                        q =>
                            q.expiry === qualification.expiry &&
                            q.type === qualification.type
                    );

                    // No dupe found - safe to add it.
                    // Use the latest expiry date if possible, else use the current date.
                    if (!dupe) {
                        return acc.concat({
                            ...qualification,
                            expiry: latest.isValid()
                                ? latest.format("YYYY-MM-DD")
                                : qualification.expiry,
                            id: uuid()
                        });
                    }
                    return acc;
                },
                [] as Qualification[]
            );
        });
    }

    /**
     * Removes all non alphabet (a-zA-Z) characters from string.
     * @param str A string.
     * @return The filtered string.
     */
    private filterNonAlpha(str: string): string {
        return str.replace(/\W/g, "");
    }

    /**
     * Matches an initial with a name.
     * @param initial The initial.
     * @param name The name to match the initial with.
     * @return The name if the initial matches, or the initial if not.
     */
    private matchInitial(initial: string, name: string): string {
        return initial === name.charAt(0) ? name : initial;
    }

    /**
     * Merges names together. Any initials are replaced by its full name counterpart, if found.
     * Prioritizes the first name passed in.
     * @param names The names to merge together.
     * @return The merged name.
     */
    private mergeNames(...names: string[]): string {
        return names.reduce((acc, name) => {
            const filteredName = this.filterNonAlpha(name);
            if (!acc) {
                return filteredName;
            }

            // Previous value was an initial.
            if (acc.length === 1) {
                return this.matchInitial(acc, filteredName);
                // Current value was an initial.
            } else if (filteredName.length === 1) {
                return this.matchInitial(filteredName, acc);
                // Neither was an initial - return the previous value.
            } else {
                return acc;
            }
        }, "");
    }
}
