import { Injectable } from '@nestjs/common';
import { Orders } from './entities/orders.entity';
import { ItemService } from '../item/item.service';
import { OrderItemEntity } from '../item/entities/orderitem.entity';
import { Customer } from '../item/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    private itemService: ItemService,
  ) {
  }

  async makeOrders(data: any[]) {
    let orders: Orders[] = [];
    try {
      const orderslist = data.map(async (order) => {
        const items: OrderItemEntity[] = await this.itemService.makeOrderItems(order.Items.Item);
        const customer: Customer = {
          id: order.Customer.Id,
          c_name: order.Customer.Contact.Name,
          email: order.Customer.Email,
          username: order.Customer.Username,
          c_mobile: order.Customer.Contact.Phone,
        }
        return {
          orderid: order.Id,
          date: order.Date,
          type: order.Type,
          status_id: order.StatusID,
          p_id: order.Shipping.PackageNumber,
          payment: order.Payment.Type,
          weight: order.Weight,
          customer: customer,
          items: items,
        };
      });
      orders = await Promise.all(orderslist);
    }catch{
      let items: OrderItemEntity[] = await this.itemService.makeOrderItems(data[0].Items.Item);
      const customer: Customer = {
        id: data[0].Customer.Id,
        c_name: data[0].Customer.Contact.Name,
        email: data[0].Customer.Email,
        username: data[0].Customer.Username,
        c_mobile: data[0].Customer.Contact.Phone,
      }
      orders.push({
        orderid: data[0].Id,
        date: data[0].Date,
        type: data[0].Type,
        status_id: data[0].StatusID,
        p_id: data[0].Shipping.PackageNumber,
        payment: data[0].Payment.Type,
        weight: data[0].Weight,
        customer: customer,
        items: items,
      });
    }
    return orders;
  }
}
