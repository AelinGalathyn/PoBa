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

  async makeOrders(data: any[] | any) {
    let orders: Orders[] = [];
    const orderslist = async (order: any) => {
      try {
        const items: OrderItemEntity[] = await this.itemService.makeOrderItems(order.Items.Item);
        const customer: Customer = {
          id: order.Customer.Key,
          c_name: order.Customer.Contact.Name,
          email: order.Customer.Email,
          username: order.Customer.Username,
          c_mobile: order.Customer.Contact.Phone,
        };
        orders.push({
          orderid: order.Key,
          date: order.Date,
          type: order.Type,
          status_id: order.Status,
          sender: order['Shipping']['Name'],
          payment: order.Payment.Type,
          weight: order.Weight,
          customer: customer,
          items: items,
          gross: order.SumPriceGross,
        });
      } catch (err) {
        console.error(`Error processing order order ${order.Key}: ${err.message}`);
      }
    }

    if(Array.isArray(data)){
      data.forEach(orderslist);
    } else {
      await orderslist(data);
    }

    return orders;
  }
}
