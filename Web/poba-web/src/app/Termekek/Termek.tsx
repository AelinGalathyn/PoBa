export default class Termek {
    private readonly _id: number;

    private readonly _sku: string;

    private readonly _name: string;

    private _qty: number;

    private readonly _unit: string;

    private readonly _status: number;

    private readonly _cat_name: string;

    private readonly _url: string;


    constructor(id: number, sku: string, name: string, qty: number, unit: string, status: number, cat_name: string, url: string) {
        this._id = id;
        this._sku = sku;
        this._name = name;
        this._qty = qty;
        this._unit = unit;
        this._status = status;
        this._cat_name = cat_name;
        this._url = url;
    }


    get id(): number {
        return this._id;
    }

    get sku(): string {
        return this._sku;
    }

    get name(): string {
        return this._name;
    }

    get qty(): number {
        return this._qty;
    }

    get unit(): string {
        return this._unit;
    }

    get status(): number {
        return this._status;
    }

    get cat_name(): string {
        return this._cat_name;
    }

    get url(): string {
        return this._url;
    }


    set qty(value: number) {
        this._qty = value;
    }
}