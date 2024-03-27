import {id} from "postcss-selector-parser";

export class Customer {
    id: number;
    c_name: string;
    email: string;
    username: string;
    c_mobile: string;
    constructor(id: number, c_name: string, email: string, username: string, c_mobile: string) {
        this.id = id;
        this.c_name = c_name;
        this.email = email;
        this.username = username;
        this.c_mobile = c_mobile;
    }
}
