import { IUser } from "../../core/models/IUser";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid/v4";

export class User implements IUser {
    get id(): string {
        return this._id;
    }
    private _id: string;

    private _passwordHash: string;

    /**
     * Compares a password to the stored hash
     * @param password
     */
    login(password: string): boolean {
        return bcrypt.compareSync(password, this._passwordHash);
    }

    /**
     * Creates a new user with the specified username and password
     * @param params
     */
    static create(params: { username: string; password: string }): User {
        let user = new User();
        user._id = params.username;
        user._passwordHash = bcrypt.hashSync(params.password, 10);
        return user;
    }
}