import axios from "axios";
import {cache} from "react";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";

export const ModifyTermekQty = cache( async(webshopId: number, item : FItem, modifiedQty : number) => {
    const response = await axios.post(`http://localhost:3000/item/setStock`, {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            webshopid: webshopId,
            sku: item.sku,
            stock: modifiedQty
        }

    }).catch(e => {console.log(e); throw new Error(e)});
})
