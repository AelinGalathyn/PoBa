import User from "@/DTOs/Users/User";

export default class BDUser {
    constructor(public user : User, public userid: number) {
    }
}