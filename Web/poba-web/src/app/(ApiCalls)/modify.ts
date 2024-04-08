import axios from "axios";
import {cache} from "react";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";

export const ModifyTermekQty = cache( async(webshopId: number, item : FItem, modifiedQty : number) => {
    await axios.post(`http://localhost:3000/item/setStock/`, {
        withCredentials: true,
        params: {
            webshopid: webshopId,
            sku: item.sku,
            stock: modifiedQty
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
})
