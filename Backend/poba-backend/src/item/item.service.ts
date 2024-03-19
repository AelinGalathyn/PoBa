import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor() {}

  async makeItems(data: any[]){
    let items: Item[] = [];
    data.forEach((item) => {
      let qty: number;
      if (item.Stocks.Status.Active === '0') {
        qty = -1;
      } else {
        qty = parseFloat(item.Stocks.Stock.Qty);
      }

      items.push({
        id: item.Id,
        sku: item.Sku,
        name: item.Name,
        qty: qty,
        unit: item.Unit,
        status: item.Statuses.Status.Value,
        cat_name: item.Categories.Category.Name,
        url: item.Url});
    });
    return items;
  }
}
