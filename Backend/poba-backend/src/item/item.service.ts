import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { OrderItemEntity } from './entities/orderitem.entity';

@Injectable()
export class ItemService {
  constructor() {}

  async makeItems(data: any[]){
    console.log(data);
    let items: Item[] = [];
    try{
    data.forEach((item) => {
      let qty: number;
      if (item.Stocks.Status.Active === '0') {
        qty = -1;
      } else {
        qty = parseFloat(item.Stocks.Stock.Qty);
      }
      let img: string;
      try {
        img = item.Images.Image.Filename;
      } catch {
        img = '';
      }
      let price;
      try {
        price = item.Prices.Price[0].Net;
      }
      catch {
        price = item.Prices.Price.Net;
      }

      items.push({
        id: item.Id,
        sku: item.Sku,
        name: item.Name,
        qty: qty,
        unit: item.Unit,
        status: item.Statuses.Status.Value,
        cat_name: item['Categories']['Category'].map((cat) => cat.Name),
        url: item.Url,
        pic_url: img,
        price: item.Prices.Price.Net,
      })


    });
    } catch{

      let price;
      try {
        price = data[0].Prices.Price[0].Net;
      }
      catch {
        price = data[0].Prices.Price.Net;
      }
      let qty: number;
      try{
        qty = parseFloat(data[0].Stocks.Stock.Qty);
      }catch{
        qty = -1;
      }
      let img: string;
      try {
        img = data[0].Images.Image.Filename;
      } catch {
        img = '';
      }

      items.push({
        id: data[0].Id,
        sku: data[0].Sku,
        name: data[0].Name,
        qty: qty,
        unit: data[0].Unit,
        status: data[0].Statuses.Status.Value,
        cat_name: data[0]['Categories']['Category'].map((cat) => cat.Name),
        url: data[0].Url,
        pic_url: img,
        price: data[0].Prices.Price.Net,
      });
    }

    return items;
  }

  async makeOrderItems(data: any[]){
    let items: OrderItemEntity[] = [];
    try{
      data.forEach((item) => {

        items.push({
          id: item.Id,
          sku: item.Sku,
          name: item.Name,
          quantity: item.Quantity,
          unit: item.Unit,
          status: item.Status,
          net: item.PriceNet,
          gross: item.PriceGross,
          vat: item.Vat,
        });

        console.log(item.Price)
      });
    } catch{
      let qty: number;
      try{
        qty = parseFloat(data[0].Stocks.Stock.Qty);
      }catch{
        qty = -1;
      }

      items.push({
        id: data[0].Id,
        sku: data[0].Sku,
        name: data[0].Name,
        quantity: qty,
        unit: data[0].Unit,
        status: data[0].Status,
        net: data[0].PriceNet,
        gross: data[0].PriceGross,
        vat: data[0].Vat,
      });
    }

    return items;
  }
}
