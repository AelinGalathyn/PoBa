import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as xml2js from 'xml2js';
import { Webshop } from '../webshop/entities/webshop.entity';
import { ApicallsService } from './apicalls/apicalls.service';
import { Orders } from '../orders/entities/orders.entity';

const ApiUrl = 'https://api.unas.eu/shop/';

@Injectable()
export class ExternalService {
  constructor(
    private httpService: HttpService,
    private apicallService: ApicallsService) {
  }

  async getItems(webshop: Webshop) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
    };
    const result = await this.unasRequest('getProduct', headers, body, webshop);
    return result.Products.Product;
  }

  async getItemsById(webshop: Webshop, id: string) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
      'Id': id,
    };
    const response = await this.unasRequest('getProduct', headers, body, webshop);
    return response.Products.Product;
  }

  async getOrders(webshop: Webshop) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
    };
    const response = await this.unasRequest('getOrder', headers, body, webshop);
    return response.Orders.Order;
  }

  async getOrderById(webshop: Webshop, id: string) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
      'Key': id,
    };
    const response = await this.unasRequest('getOrder', headers, body, webshop);
    return response.Orders.Order;
  }

  async setStock(webshop: Webshop, sku: string, stock: number) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/xml', // Make sure the API expects JSON
    };
    const body = `<?xml version="1.0" encoding="UTF-8"?>
    <Products>
      <Product>
        <Action>modify</Action>
        <Sku>${sku}</Sku>
        <Stocks>
          <Stock>
            <Qty>${stock}</Qty>
          </Stock>
        </Stocks>
      </Product>
    </Products>`;

    const response = await this.unasRequest('setStock', headers, body, webshop);
    console.log(response)
    return response.Products.Product.Status;
  }

  async parseXML(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async getStatuses(webshop: Webshop) {
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'text/plain', // Make sure the API expects JSON
    };
    const body = `<?xml version="1.0" encoding="UTF-8"?>
    <Params>
    </Params>`
    const response = await this.unasRequest('getOrderStatus', headers, body, webshop);
    console.log(response);
    return response.OrderStatuses.OrderStatus;
  }

  async setStatus(webshop: Webshop, order: Orders, statusid: number){
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/xml', // Make sure the API expects JSON
    };
    const body = `<?xml version="1.0" encoding="UTF-8"?>
    <Orders>
      <Order>
        <Action>modify</Action>
        <Key>${order.orderid}</Key>
        <Status>${statusid}</Status>
      </Order>
    </Orders>`;

    const response = await this.unasRequest('setOrder', headers, body, webshop);
    console.log(response);
    return response.status;
  }

  async unasLogin(webshop: Webshop) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        'ApiKey': webshop.unas_api,
        'WebshopInfo': 'true',
      };
      const data = await this.unasRequest('login', headers, body, webshop);
      webshop.unas_token = data.Login.Token;
      webshop.token_date = new Date();
      webshop.name = data.Login.WebshopInfo.WebshopName;
    } catch (err) {
      console.error('Error during unasRequest or its subsequent operations:', err);
    }
    return webshop;
  }

  async unasRequest(url: string, headers: {}, body: {}, webshop: Webshop) {
    try {
      const response = await this.httpService.post(`${ApiUrl}${url}`, body, { headers }).toPromise();
      try {
        const result = await this.parseXML(response.data);
        if(webshop.webshopid){
          await this.apicallService.createOrUpdate(webshop, url);
        }
        return result;
      } catch (xmlParseError) {
        console.error(`Error parsing XML from unasRequest for ${url}:`, xmlParseError);
        throw new Error(`Failed to parse XML response for ${url}`);
      }
    } catch (httpError) {
      throw new Error(`HTTP request failed for ${url}`);
    }
  }
}