export class OrderItemEntity {
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public unit: string,
        public quantity: number,
        public net: number,
        public gross: number,
        public vat: string,
        public status: string
    ) {}
}
