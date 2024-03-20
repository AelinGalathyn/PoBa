import User from "@/Users/User";

export default class BDUser extends User {

    private readonly _userid : number;

    constructor(username: string, password: string, userid: number) {
        super(username, password);
        this._userid = userid;
    }

    get userid(): number {
        return this._userid;
    }
}