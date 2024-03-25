export default class Item {
    id: number;

    sku: string;

    name: string;

    qty: number;

    unit: string;

    status: number;

    catname: string;

    url: string;
    
    constructor(id: number, sku: string, name: string, qty: number, unit: string, status: number, catname: string, url: string) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.qty = qty;
        this.unit = unit;
        this.status = status;
        this.catname = catname;
        this.url = url;
    }


    get Id(): number {
        return this.id;
    }

    get Sku(): string {
        return this.sku;
    }

    get Name(): string {
        return this.name;
    }

    get Qty(): number {
        return this.qty;
    }

    get Unit(): string {
        return this.unit;
    }

    get Status(): number {
        return this.status;
    }

    get Catname(): string {
        return this.catname;
    }

    get Url(): string {
        return this.url;
    }
}