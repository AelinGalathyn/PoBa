import { OrderItemEntity } from "@/DTOs/Rendelesek/RendelesItem";
import { Customer } from "@/DTOs/Rendelesek/Vevo";

export class Orders {
    constructor(
        public orderid: number,
        public date: Date,
        public type: string,
        public status_id: number,
        public sender: number,
        public payment: string,
        public gross: number,
        public weight: number,
        public customer: Customer,
        public items: OrderItemEntity[]
    ) {}
}
