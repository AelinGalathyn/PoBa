import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from './external.service';
import { HttpService } from '@nestjs/axios';
import { ApicallsService } from './apicalls/apicalls.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

jest.mock('./apicalls/apicalls.service');

function mockHttpServicePost(httpService: HttpService, response: any): void {
  const mockAxiosResponse: AxiosResponse = {
    data: response,
    status: 200,
    statusText: 'OK',
    headers: undefined,
    config: undefined,
  };

  jest.spyOn(httpService, 'post').mockReturnValue(of(mockAxiosResponse));
}

describe('ExternalService', () => {
  let service: ExternalService;
  let httpService: HttpService;
  let apicallsService: ApicallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        ApicallsService,
      ],
    }).compile();

    service = module.get<ExternalService>(ExternalService);
    httpService = module.get<HttpService>(HttpService);
    apicallsService = module.get<ApicallsService>(ApicallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getItems', () => {
    it('should return items successfully', async () => {
      const mockWebshop = { unas_token: 'token' };
      const mockResponse: AxiosResponse = {
        config: undefined, headers: undefined,
        data: `<Products><Product><Id>1</Id></Product></Products>`,
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(mockResponse));
      jest.spyOn(apicallsService, 'createOrUpdate').mockResolvedValue(undefined);

      const result = await service.getItems(mockWebshop as any);
      expect(result).toEqual({ Id: '1' });
    });


    it('should handle HTTP request errors', async () => {
      const mockWebshop = { unas_token: 'token' };
      jest.spyOn(httpService, 'post').mockImplementation(() => {
        throw new Error('Request failed');
      });

      await expect(service.getItems(mockWebshop as any)).rejects.toThrow('Request failed');
    });
  });

  describe('setStock', () => {
    it('should set stock for a product', async () => {
      const mockResponse = '<Products><Product><Status>Success</Status></Product></Products>';
      mockHttpServicePost(httpService, mockResponse);

      jest.spyOn(service, 'unasRequest').mockResolvedValue({
        Products: { Product: { Status: 'Success' } }
      });

      const webshop = { unas_token: 'dummy_token' }; // mock webshop
      const sku = 'SKU123';
      const stock = 10;

      const result = await service.setStock(webshop as any, sku, stock);

      expect(result).toEqual('Success');
      expect(service.unasRequest).toHaveBeenCalledWith('setStock', expect.any(Object), expect.any(String), webshop);
    });
  });

  describe('parseXML', () => {
    it('should parse XML string successfully', async () => {
      const xml = `<response><status>success</status></response>`;
      const result = await service.parseXML(xml);
      expect(result).toEqual({ response: { status: 'success' } });
    });

    it('should reject on XML parsing error', async () => {
      const xml = `<response><status>malformed xml</status>`;
      await expect(service.parseXML(xml)).rejects.toThrow();
    });
  });

  describe('unasLogin', () => {
    it('should login and update webshop token', async () => {
      const mockResponse = '<Login><Token>new_token</Token><WebshopInfo><WebshopName>TestShop</WebshopName></WebshopInfo></Login>';
      mockHttpServicePost(httpService, mockResponse);

      jest.spyOn(service, 'unasRequest').mockResolvedValue({
        Login: {
          Token: 'new_token',
          WebshopInfo: { WebshopName: 'TestShop' }
        }
      });

      const webshop = { unas_api: 'api_key' }; // Mock webshop

      const updatedWebshop = await service.unasLogin(webshop as any);

      expect(updatedWebshop.unas_token).toEqual('new_token');
      expect(updatedWebshop.name).toEqual('TestShop');
      expect(service.unasRequest).toHaveBeenCalledWith('login', expect.any(Object), expect.any(Object), webshop);
    });
  });
});
