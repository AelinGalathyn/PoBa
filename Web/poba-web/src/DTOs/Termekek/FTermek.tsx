export class Item {
    id: number;
    sku: string;
    name: string;
    qty: number;
    unit: string;
    status: number;
    cat_name: string[];
    url: string;
    pic_url: string;

    constructor(id: number, sku: string, name: string, qty: number, unit: string, status: number, cat_name: string[], url: string, pic_url: string) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.qty = qty;
        this.unit = unit;
        this.status = status;
        this.cat_name = cat_name;
        this.url = url;
        this.pic_url = pic_url;
    }
}
