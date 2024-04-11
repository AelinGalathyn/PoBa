import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { OrderItemEntity } from './entities/orderitem.entity';

@Injectable()
export class ItemService {
  constructor() {
  }

  async makeItems(data: any[] | any): Promise<Item[]> {
    let items: Item[] = [];
    let errors: string[] = [];
    const processData = (item: any) => {
      try {
        if (item.State !== 'deleted') {
          let qty: number;
          try {
            qty = item.Stocks.Status.Active === '0' ? -1 : parseFloat(item.Stocks.Stock.Qty);
          } catch {
            qty = -1;
          }
          const img = item.Images?.Image[0]?.SefUrl || '';
          const price = Array.isArray(item.Prices.Price) ? item.Prices.Price[0].Net : item.Prices.Price.Net;

          items.push({
            id: item.Id,
            sku: item.Sku,
            name: item.Name,
            qty,
            unit: item.Unit,
            status: item.Statuses.Status.Value,
            cat_name: item.Categories.Category.map((cat) => cat.Name),
            url: item.Url,
            pic_url: img,
            price: Math.round(price * 100) / 100,
            packaged: item.PackageProduct ==='yes' ? true : false,
          });
        }
      } catch (err) {
        errors.push(`Error processing item ${item.Id}: ${err.message}`);
      }
    };

    if (Array.isArray(data)) {
      data.forEach(processData);
    } else {
      processData(data);
    }

    if (errors.length > 0) {
      throw new Error(`Errors encountered: ${errors.join(', ')}`);
    }

    return items;
  }


  async makeOrderItems(data: any[] | any): Promise<OrderItemEntity[]> {
    let items: OrderItemEntity[] = [];
    const processData = (item: any) => {
      try {
        items.push({
          id: item.Id,
          sku: item.Sku,
          name: item.Name,
          quantity: parseFloat(item.Quantity),
          unit: item.Unit,
          status: item.Status,
          net: Math.round(item.PriceNet * 100) / 100,
          gross: Math.round(item.PriceGross * 100) / 100,
          vat: item.Vat,
        });
      } catch (err) {
        console.error(`Error processing order item ${item.Id}: ${err.message}`);
      }
    };

    if (Array.isArray(data)) {
      data.forEach(processData);
    } else {
      processData(data);
    }

    return items;
  }
}
