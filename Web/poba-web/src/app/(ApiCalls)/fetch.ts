import axios from "axios";
import { cache } from "react";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";

export const fetch_rendelesek = cache( async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/${webshopId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {console.log(e); throw new Error("Failed to get orders list - " + e)});

    const orders : Orders[] = response.data;

    return orders;
})

export const fetch_rendeles = cache( async(webshopId : number, orderId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/${webshopId}/${orderId}`, {
        withCredentials: true,
    }).catch(e => {console.log(e); throw new Error("Failed to get this single order - " + e)});

    const order : Orders = response.data;

    return order;
})

export const fetch_termekek = cache(async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/item/${webshopId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {console.log(e); throw new Error("Failed to get items list - " + e)});

    const termekek : FItem[] = response.data;
    return termekek;
})

export const fetch_termek = cache( async(webshopId : number, termekId : number) => {
    const response = await axios.get(`http://localhost:3000/item/${webshopId}/${termekId}`, {
        withCredentials: true,
    }).catch(e => {throw new Error("Failed to get this single item - " + e)});

    const termek : FItem = response.data;

    return termek;
})

export const fetch_webshopok = cache( async() => {
    const response = await axios.get(`http://localhost:3000/webshop`, {
        withCredentials: true
    }).catch(e => {throw new Error("Failed to get webshop list - " + e)});

    const webshopok : FWebshop[] = response.data;

    return webshopok;
})

export const fetch_username = async() => {
    const response = await axios.get('http://localhost:3000/', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {throw new Error("Failed to check session and get username - " + e)});

    if (response.data.isValid === false) {
        return false;
    } else {
        const username : string = response.data.username;
        return username;
    }
}