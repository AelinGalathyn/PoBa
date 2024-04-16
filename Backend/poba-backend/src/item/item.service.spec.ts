import { ItemService } from './item.service';

const mockSingleItem = {
  Id: 1,
  Sku: 'SKU123',
  Name: 'Item Name',
  State: 'active',
  Stocks: {
    Status: { Active: '1' },
    Stock: { Qty: '100' }
  },
  Images: {
    Image: [{ SefUrl: 'http://example.com/image.png' }]
  },
  Prices: {
    Price: { Net: '20' }
  },
  Unit: 'pcs',
  Statuses: {
    Status: { Value: 'available' }
  },
  Categories: {
    Category: [{ Name: 'Category 1' }]
  },
  Url: 'http://example.com/item'
};

const mockItemsArray = [mockSingleItem, {
  ...mockSingleItem,
  Id: 2,
  Sku: 'SKU124',
  Name: 'Another Item Name',
}];

const mockMalformedItem = {
  Id: 0,
  Stocks: {
    Status: { Active: '1' },
  },
};

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    service = new ItemService();
  });

  describe('makeItems', () => {
    it('should process a single item correctly', async () => {
      const result = await service.makeItems(mockSingleItem);
      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(mockSingleItem.Id);
    });

    it('should process an array of items correctly', async () => {
      const result = await service.makeItems(mockItemsArray);
      expect(result).toHaveLength(mockItemsArray.length);
      expect(result[1].id).toEqual(mockItemsArray[1].Id);
    });
  });

  describe('makeOrderItems', () => {
    // Assuming mockSingleOrderItem and mockOrderItemsArray are defined similarly to the items mock data
    it('should process a single order item correctly', async () => {
      const result = await service.makeOrderItems(mockSingleItem); // Adapt this if your order items differ
      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(mockSingleItem.Id);
    });

    it('should process an array of order items correctly', async () => {
      const result = await service.makeOrderItems(mockItemsArray); // Adapt this for order items
      expect(result).toHaveLength(mockItemsArray.length);
      expect(result[1].id).toEqual(mockItemsArray[1].Id);
    });
  });

  describe('makeItems with exceptions', () => {
    it('should throw an error if any item is malformed', async () => {
      const mixedData = [mockSingleItem, mockMalformedItem];
      await expect(service.makeItems(mixedData)).rejects.toThrow();
    });

    it('should throw an error for a single malformed item', async () => {
      await expect(service.makeItems(mockMalformedItem)).rejects.toThrow();
    });
  });
});
