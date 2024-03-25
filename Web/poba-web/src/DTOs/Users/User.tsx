export default class User {
    username : string;
    password : string;

    constructor(username: string, password : string) {
        this.username = username;
        this.password = password;
    }

    get Username(): string {
        return this.username;
    }

    get Password(): string {
        return this.password;
    }
}