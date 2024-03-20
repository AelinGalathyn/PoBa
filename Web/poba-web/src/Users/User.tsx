export default class User {
    _username : string;
    _password : string;
    constructor(username: string, password : string) {
        this._username = username;
        this._password = password;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }
}