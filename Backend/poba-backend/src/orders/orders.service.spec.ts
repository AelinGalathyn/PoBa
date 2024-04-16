import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ItemService } from '../item/item.service';
import { Orders } from './entities/orders.entity';
import { OrderItemEntity } from '../item/entities/orderitem.entity';

jest.mock('../item/item.service');

describe('OrdersService', () => {
  let service: OrdersService;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        ItemService,
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    itemService = module.get<ItemService>(ItemService);
    jest.clearAllMocks();
  });

  describe('OrdersService', () => {
    let service: OrdersService;
    let itemService: ItemService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrdersService,
          ItemService,
        ],
      }).compile();

      service = module.get<OrdersService>(OrdersService);
      itemService = module.get<ItemService>(ItemService);
    });

    describe('makeOrders', () => {
      it('should process orders correctly', async () => {
        const mockOrderItems = [ {
          id: 1,
          sku: "SKU12345",
          name: "Gadget",
          unit: "piece",
          quantity: 2,
          net: 50.00,
          gross: 60.00,
          vat: "20%",
          status: "In Stock",
        },
          {
            id: 2,
            sku: "SKU54321",
            name: "Accessory",
            unit: "piece",
            quantity: 1,
            net: 30.00,
            gross: 36.00,
            vat: "20%",
            status: "In Stock",
          },
        ];
        const mockData = [{
          Id: 1,
          Date: new Date("2023-04-01"),
          Type: "Online",
          Status: 2,
          Shipping: { Name: 123456 },
          Payment: { Type: "Credit Card" },
          SumPriceGross: 150.00,
          Weight: 2.5,
          Customer: {
            Id: 1,
            Contact: {
              Name: "John Doe",
              Phone: "123-456-7890",
            },
            Email: "john.doe@example.com",
            Username: "johndoe",
          },
          Items: {
            Item : mockOrderItems
        }},
          {
            Id: 2,
            Date: new Date("2023-04-01"),
            Type: "Online",
            Status: 2,
            Shipping: { Name: 123456 },
            Payment: { Type: "Credit Card" },
            SumPriceGross: 150.00,
            Weight: 2.5,
            Customer: {
              Id: 1,
              Contact: {
                Name: "John Doe",
                Phone: "123-456-7890",
              },
              Email: "john.doe@example.com",
              Username: "johndoe",
            },
            Items: {
              Item : mockOrderItems
            }}
        ];

        jest.spyOn(itemService, 'makeOrderItems').mockResolvedValue(mockOrderItems);

        const orders = await service.makeOrders(mockData);
        expect(orders).toHaveLength(mockData.length);
        expect(itemService.makeOrderItems).toHaveBeenCalledTimes(mockData.length); // Assuming one call per order
        // Further assertions to check order contents can be added here
      });

      it('should handle errors gracefully', async () => {
        const mockData = [{ /* Malformed order data to trigger error */ }];
        jest.spyOn(itemService, 'makeOrderItems').mockRejectedValue(new Error('Test Error'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await service.makeOrders(mockData);
        expect(consoleSpy).toHaveBeenCalled();
        // Depending on your error handling, you might want to check if partial data is still returned
        consoleSpy.mockRestore();
      });
    });
  });
});
