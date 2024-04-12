import { OrderItemEntity } from "@/app/(DTOs)/Rendelesek/RendelesItem";
import { Customer } from "@/app/(DTOs)/Rendelesek/Vevo";

export class Orders {
    constructor(
        public orderid: string,
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
