import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as xml2js from 'xml2js';
import { Webshop } from '../webshop/entities/webshop.entity';

const ApiUrl = 'https://api.unas.eu/shop/';

@Injectable()
export class ExternalService {
  constructor(
    private httpService: HttpService) {
  }

  async getItems(webshop: Webshop) {
    webshop = await this.unasLogin(webshop);
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
    };
    const result = await this.unasRequest('getProduct', headers, body);
    return result.Products.Product;
  }

  async getOrders(webshop: Webshop) {
    webshop = await this.unasLogin(webshop);
    const headers = {
      'Authorization': `Bearer ${webshop.unas_token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      'ContentType': 'full',
    };
    const response = await this.unasRequest('getOrder', headers, body);
    //TODO: orderst befejezni
  }

  async parseXML(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async unasLogin(webshop: Webshop) {
    let shouldProceedWithLogin = false;

    try {
      shouldProceedWithLogin = webshop.token_date === null || new Date().getTime() - webshop.token_date.getTime() / (1000 * 60 * 60) > 3;
    } catch (err) {
      shouldProceedWithLogin = true;
    }

    if (shouldProceedWithLogin) {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };
        const body = {
          'ApiKey': webshop.unas_api,
          'WebshopInfo': 'true',
        };
        const data = await this.unasRequest('login', headers, body);
        webshop.unas_token = data.Login.Token;
        webshop.token_date = new Date();
        webshop.name = data.Login.WebshopInfo.WebshopName;
      } catch (err) {
        console.error("Error during unasRequest or its subsequent operations:", err);
      }
    }
    return webshop;

  }

  async unasRequest(url: string, headers: {}, body: {}) {
    const response = await this.httpService.post(`${ApiUrl}${url}`, body, { headers }).toPromise();
    const xmlData = response.data;
    const result = await this.parseXML(xmlData);
    return result;
  }
}
