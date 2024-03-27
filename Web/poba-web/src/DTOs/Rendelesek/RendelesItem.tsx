export class OrderItemEntity{
    id: number;

    sku: string;

    name: string;

    unit: string;

    quantity: string;

    net: number;

    gross: number;

    vat: string;

    status: string;
    constructor(id: number, sku: string, name: string, unit: string, quantity: string, net: number, gross: number, vat: string, status: string) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
        this.net = net;
        this.gross = gross;
        this.vat = vat;
        this.status = status;
    }
}