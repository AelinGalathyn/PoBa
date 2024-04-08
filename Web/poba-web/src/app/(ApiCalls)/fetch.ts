import axios from "axios";
import { cache } from "react";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";

export const fetch_rendelesek = cache( async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/all/`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    const orders : Orders[] = response.data;

    return orders;
})

export const fetch_rendeles = cache( async(webshopId : number, orderId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/${orderId}`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    const order : Orders = response.data;

    return order;
})

export const fetch_termekek = async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/item/all`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    console.log(response);
    const termekek : FItem[] = response.data;
    return termekek;
}

export const fetch_termek = cache( async(webshopId : number, termekId : number) => {
    const response = await axios.get(`http://localhost:3000/item/${termekId}`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    const termek : FItem = response.data;

    return termek;
})

export const fetch_webshopok = cache( async() => {
    const response = await axios.get(`http://localhost:3000/webshop/list`, {
        withCredentials: true
    });

    const webshopok : FWebshop[] = response.data;

    return webshopok;
})

export const fetch_username = async() => {
    const response = await axios.get('http://localhost:3000/', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log("response data: "+JSON.stringify(response.data, null, 2));
    console.log("response data: "+response.data.webshopid);

    if (response.data.isValid === false) {
        return false;
    } else {
        const username : string = response.data.username;
        console.log("username: "+username);
        return username;
    }
}