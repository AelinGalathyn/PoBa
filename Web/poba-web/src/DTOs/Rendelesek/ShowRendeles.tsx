import {Orders} from "@/DTOs/Rendelesek/Rendeles";

export default class ShowRendeles {
    constructor(public order : Orders, public isShown : boolean){
    }
}