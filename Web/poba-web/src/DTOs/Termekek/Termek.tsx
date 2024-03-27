import {Item} from "@/DTOs/Termekek/FTermek";

export default class FItem extends Item{
    date : Date;

    constructor(id: number, sku: string, name: string, qty: number, unit: string, status: number, cat_name: string[], url: string, pic_url: string, date: Date) {
        super(id, sku, name, qty, unit, status, cat_name, url, pic_url);
        this.date = date;
    }
}
