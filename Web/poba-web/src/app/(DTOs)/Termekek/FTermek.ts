export class FItem {
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public qty: number,
        public unit: string,
        public status: number,
        public cat_name: string[],
        public url: string,
        public pic_url: string,
        public price: number,
        public packaged : boolean
    ) {}
}
