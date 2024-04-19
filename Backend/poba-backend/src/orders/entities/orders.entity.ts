import { OrderItemEntity } from '../../item/entities/orderitem.entity';
import { Customer } from '../../item/entities/customer.entity';

export class Orders {
  orderid: number;

  date: Date;

  status_id: number;

  sender: string;

  payment: string;

  gross: number;

  weight: number;

  customer: Customer;

  items: OrderItemEntity[];
}
