import {OrderItemEntity} from "@/DTOs/Rendelesek/RendelesItem";
import {Customer} from "@/DTOs/Rendelesek/Vevo";

export class Orders {
    orderid: number;

    date: Date;

    type: string;

    status_id: number;

    p_id: number;

    payment: number;

    weight: number;

    customer: Customer;

    items: OrderItemEntity[];
    constructor(orderid: number, date: Date, type: string, status_id: number, p_id: number, payment: number, weight: number, customer: Customer, items: OrderItemEntity[]) {
        this.orderid = orderid;
        this.date = date;
        this.type = type;
        this.status_id = status_id;
        this.p_id = p_id;
        this.payment = payment;
        this.weight = weight;
        this.customer = customer;
        this.items = items;
    }
}
