import {OrderItemEntity} from "@/DTOs/Rendelesek/RendelesItem";
import {Customer} from "@/DTOs/Rendelesek/Vevo";

export class Orders {
    orderid: number;
    date: Date;
    type: string;
    status_id: number;
    sender: number;
    payment: string;
    gross: number;
    weight: number;
    customer: Customer;
    items: OrderItemEntity[];

    constructor(orderid: number, date: Date, type: string, status_id: number, sender: number, payment: string, gross: number, weight: number, customer: Customer, items: OrderItemEntity[]) {
        this.orderid = orderid;
        this.date = date;
        this.type = type;
        this.status_id = status_id;
        this.sender = sender;
        this.payment = payment;
        this.gross = gross;
        this.weight = weight;
        this.customer = customer;
        this.items = items;
    }
}
