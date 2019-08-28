import { ArrayMinSize, IsDateString, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { Injectable } from 'injection-js';
import { compact, clone, find, map, reject } from 'lodash';
import { Context } from 'koa';
import { UserMerger } from "./user-merger.service";
import * as uuid from 'uuid/v4';


export interface Qualification {
    id: string;
    type: string;
    uniqueId: string | null;
    expiry: string | null;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    qualifications: Qualification[];
}

export class CreateUserQualification {
    @IsString()
    @MinLength(1)
    type: string = '';

    @IsOptional()
    @IsString()
    uniqueId: string | null = null;

    @IsOptional()
    @IsDateString()
    expiry: string | null = null;
}

export class CreateUser {
    @IsString()
    @MinLength(1)
    firstName: string = '';

    @IsString()
    @MinLength(1)
    lastName: string = '';

    @ValidateNested({each: true})
    qualifications: CreateUserQualification[] = [];
}

export class DeleteUser {
    @IsUUID()
    id: string = '';
}

export class MergeUser {
    @IsUUID("4", {each: true})
    @ArrayMinSize(2)
    ids: string[] = [];
}

export class UpdateName {
    @IsUUID()
    id: string = '';

    @IsString()
    @MinLength(1)
    firstName: string = '';

    @IsString()
    @MinLength(1)
    lastName: string = '';
}


export class AddQualification extends CreateUserQualification {
    @IsUUID()
    userId: string = '';
}


export class DeleteQualification {
    @IsUUID()
    id: string = '';
}


@Injectable()
export class UserRepository {
    private users: User[] = [];

    public constructor() {
    }

    public get(id: string): User | undefined {
        return find(this.users, {id: id});
    }

    public getAll(ids: string[]): (User | undefined)[] {
        return map(ids, id => this.get(id));
    }

    public list(): User[] {
        return this.users;
    }

    public create(command: CreateUser) {
        const user: User = {
            id: uuid(),
            firstName: command.firstName,
            lastName: command.lastName,
            qualifications: map(command.qualifications, (qualification) => {
                return {
                    id: uuid(),
                    ...qualification,
                };
            }),
        };

        this.users = [...this.users, user];

        return user;
    }

    public delete(command: DeleteUser) {
        this.users = reject(this.users, {id: command.id});
    }

    /**
     * Merges all of the users together
     * @param ctx The koa context
     * @param cmd The merge user class, containing an array of user ids
     */
    public merge(ctx: Context, cmd: MergeUser) {
        const users = this.getAll(cmd.ids);
        const compactUsers = compact(users);

        // The compact users arr is a different length than the users arr
        // Thus, a falsy value must have existed
        if (users.length !== compactUsers.length) {
            ctx.status = 400;
            ctx.body = "An ID does not exist";
        } else {
            this.users = [new UserMerger().merge(compactUsers)];
        }
    }

    public updateName(command: UpdateName) {
        this.users = map(this.users, (user) => {
            if (user.id === command.id) {
                const newUser = clone(user);
                newUser.firstName = command.firstName;
                newUser.lastName = command.lastName;
                return newUser;
            }
            else {
                return user;
            }
        });
    }

    public addQualification(command: AddQualification) {
        let qualification: Qualification | undefined;
        this.users = map(this.users, (user) => {
            if (user.id === command.userId) {
                qualification = {
                    id: uuid(),
                    type: command.type,
                    uniqueId: command.uniqueId,
                    expiry: command.expiry,
                };

                return {
                    ...user,
                    qualifications: [...user.qualifications, qualification],
                };
            }
            else {
                return user;
            }
        });

        return qualification;
    }

    public deleteQualification(command: DeleteQualification) {
        this.users = map(this.users, (user) => {
            user.qualifications = reject(user.qualifications, {id: command.id});
            return user;
        });
    }
}
