import {Item} from "@/DTOs/Termekek/FTermek";

export default class ShowItem extends Item{
    showItem : boolean;

    constructor(id: number, sku: string, name: string, qty: number, unit: string, status: number, cat_name: string[], url: string, pic_url: string, showItem: boolean) {
        super(id, sku, name, qty, unit, status, cat_name, url, pic_url);
        this.showItem = showItem;
    }
}
