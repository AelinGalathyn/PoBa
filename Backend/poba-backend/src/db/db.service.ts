import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../external/entities/item.entity';
import { Orders } from '../external/entities/orders.entity';
import { Customer } from '../external/entities/customer.entity';
import { Invoice } from '../external/entities/invoice.entity';
import { Basket } from '../external/entities/basket.entity';
import { Packages } from '../external/entities/packages.entity';
import { Shipping } from '../external/entities/shipping.entity';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,

    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,

    @InjectRepository(Packages)
    private packagesRepository: Repository<Packages>,

    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,) {}

  async setOrUpdateItems(data: any, webshopid: number) {
    console.log(data);
    for (const dataItem of data) {
      const exists = await this.itemRepository.createQueryBuilder("item")
        .leftJoinAndSelect("item.webshop", "webshop")
        .where("item.id = :itemId", { itemId: dataItem.id })
        // Ensure you match the primary key name in the Users entity, assuming it's `userid`
        .andWhere("webshop.webshopid = :webshopid", { webshopid: webshopid })
        .getOne();

      let item = new Item();
      item.sku = dataItem.Sku;
      item.name = dataItem.Name;
      if(dataItem.Stocks.Status.Qty === undefined){
        item.qty = 0;
      }
      else {
        item.qty = dataItem.Stocks.Status.Qty;
      }
      item.unit = dataItem.Unit;

      item.status = parseFloat(dataItem.Statuses.Status.Value); // Example conversion

      item.cat_name = dataItem.Categories.Category.Name;
      item.url = dataItem.Url;

      //item.user = { userid } as Users;

      if (exists) {
        if (!await this.isEquivalent(exists, item)) {
          await this.itemRepository.update({ id: exists.id }, item);
        }
      } else {
        await this.itemRepository.save(item); // Consider using save for new records
      }
    }
  }


  async isEquivalent(existingData: any, dataItem: any): Promise<boolean> {
    for (const key of Object.keys(existingData)) {
      if (existingData[key] !== dataItem[key]) {
        return false;
      }
    }
    return true;
  }
}
