import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DbService} from '../db/db.service';
import * as xml2js from 'xml2js';
import { UsersService } from '../users/users.service';
import { WebshopService } from '../webshop/webshop.service';

const ApiUrl = 'https://api.unas.eu/shop/';

@Injectable()
export class ExternalService {
  constructor(
    private httpService: HttpService,
    private dbService: DbService,
    private usersService: UsersService,
    private webshopService: WebshopService) {
  }

  async getItems(webshopid: number) {
    const token = this.loginCheck(webshopid);

    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
    try {
      const body = {
        "ContentType": "full"
      }
      const response = await this.httpService.post(`${ApiUrl}getProduct`, body, { headers }).toPromise();
      const xmlData = response.data;
      const result = await this.parseXML(xmlData);
      const data = result.Products.Product;
      this.dbService.setOrUpdateItems(data, webshopid);
    } catch (error) {
      console.log(error.message);
    }
  }

  async parseXML(xml: string): Promise<any>{
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, {explicitArray: false, ignoreAttrs: true}, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      })
    })
  }

  async loginCheck(webshopid: number){
    let token = this.usersService;//TOKEN
    if(token === null){
      const headers = {
        "Content-Type": "application/json",
      }
      const userid = await this.webshopService.getUserid(webshopid);
      try {
        const body = {
          "ApiKey": this.webshopService.getApiKey(userid, webshopid).toString(),
          "WebshopInfo": "true",
        }
        const response = await this.httpService.post(`${ApiUrl}/login`, body, { headers }).toPromise();
        const xmlData = response.data;
        const result = await this.parseXML(xmlData);
        const data = result.Login.Token;
        sessionStorage.setItem('token', data);
      } catch (error) {
        console.log(error.message);
      }
    }
    else {
      return token;
    }
  }

  unasLogin(){

  }
}
