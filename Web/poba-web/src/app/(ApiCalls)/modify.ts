import axios from "axios";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";

export const ModifyTermekQty = async(webshopId: number, item : FItem, modifiedQty : number) => {
    await axios.post(`http://localhost:3000/item/${webshopId}/setstock`, {}, {
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
}

export const AddWebshop = async (apiKey : string) => {
    const response = await axios.post(`http://localhost:3000/webshop`, {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            api_key : apiKey
        }
    }).catch(e => {console.log(e); throw new Error(e)});

    return response.data;
}

export const DeleteWebshop = async (webshopId : number) => {
    await axios.delete(`http://localhost:3000/webshop`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            webshopid : webshopId
        }
    }).catch(e => {console.log(e); throw new Error(e)});
}
