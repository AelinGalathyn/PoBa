import { Webshop } from '../../webshop/entities/webshop.entity';

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

  price: number;

  packaged: boolean;
}

export class InputItemDto{

  sku: string;

  stock: number;
}
