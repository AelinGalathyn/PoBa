import axios from "axios";
import { cache } from "react";

export const fetch_rendelesek = cache( async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/all/`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    return response.data;
})

export const fetch_rendeles = cache( async(webshopId : number, orderId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/all/${orderId}`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    return response.data;
})

export const fetch_termekek = cache( async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/item/all/`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    return response.data;
})

export const fetch_termek = cache( async(webshopId : number, termekId : number) => {
    const response = await axios.get(`http://localhost:3000/item/all/${termekId}`, {
        withCredentials: true,
        params: { webshopid: webshopId }
    });

    return response.data;
})

export const fetch_webshopok = cache( async() => {
    const response = await axios.get(`http://localhost:3000/webshop/list`, {
        withCredentials: true
    });

    return response.data;
})

export const fetch_username = async() => {
    const response = await axios.get('http://localhost:3000/', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data;
}