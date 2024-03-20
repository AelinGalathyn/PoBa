import User from "@/Users/User";

export default class RegisterUser extends User{
    private readonly _apikey : string;

    constructor(username: string, password: string, apikey: string) {
        super(username, password);
        this._apikey = apikey;
    }

    get apikey(): string {
        return this._apikey;
    }
}