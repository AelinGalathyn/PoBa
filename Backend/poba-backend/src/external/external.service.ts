import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as xml2js from 'xml2js';
import { Webshop } from '../webshop/entities/webshop.entity';

const ApiUrl = 'https://api.unas.eu/shop/';

@Injectable()
export class ExternalService {
  constructor(
    private httpService: HttpService,) {}

  async getItems(webshop: Webshop) {
    const headers = {
      "Authorization": `Bearer ${webshop.unas_token}`,
      "Content-Type": "application/json",
    }
      const body = {
        "ContentType": "full"
      }
      const result = await this.unasRequest('getProduct', body, headers);
      return result.Products.Product;
  }

  async parseXML(xml: string): Promise<any>{
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, {explicitArray: false, ignoreAttrs: true}, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      })
    })
  }

  async unasLogin(webshop: Webshop){
  const headers = {
    "Content-Type": "application/json",
  }
  try {
    const body = {
      "ApiKey": webshop.unas_api,
      "WebshopInfo": "true",
    }
    const result = await this.unasRequest('login', body, headers);
    const data = result.Login.Token;
    return data;
  } catch (err){
    console.log(err.message);
  }
  }

  async unasRequest(url: string, body: {}, headers: {}){
    const response = await this.httpService.post(`${ApiUrl}${url}`, body, {headers}).toPromise();
    const xmlData = response.data;
    const result = await this.parseXML(xmlData);
    return result;
  }
}
