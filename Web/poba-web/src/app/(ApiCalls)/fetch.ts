import axios from "axios";
import { cache } from "react";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {ConflictException} from "@nestjs/common";

export const fetch_rendelesek = cache( async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/orders/${webshopId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {alert("A rendelések lista lekérése sikertelen - " + e.code)});

    const orders : Orders[] = response?.data;

    return orders;
})

export const fetch_rendeles = cache( async(webshopId : number, orderId : string) => {
    const response = await axios.get(`http://localhost:3000/orders/${webshopId}/${orderId}`, {
        withCredentials: true,
    }).catch(e => {alert("A rendelés lekérése sikertelen - " + e.code)});

    const order : Orders = response?.data[0];
    return order;
})

export const fetch_termekek = cache(async(webshopId : number) => {
    const response = await axios.get(`http://localhost:3000/item/${webshopId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {alert("A termékek lista lekérése sikertelen - " + e.code)});

    const termekek : FItem[] = response?.data;
    return termekek;
})

export const fetch_webshopok = async() => {
    const response = await axios.get(`http://localhost:3000/webshop`, {
        withCredentials: true
    }).catch(e => e instanceof ConflictException ? alert("Ilyen webshop már létezik.") : alert("A webshop hozzáadása sikertelen."));

    const webshopok : FWebshop[] = response?.data;

    return webshopok;
}

export const fetch_username = async() => {
    const response = await axios.get('http://localhost:3000/', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(e => {alert("A felhasználónév és session lekérdezése sikertelen - " + e.code)});

    if (response?.data.isValid === false) {
        return false;
    } else {
        const username : string = response?.data.username;
        return username;
    }
}