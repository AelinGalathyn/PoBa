import axios from "axios";
import ShowItem from "@/DTOs/Termekek/ShowItem";
import FetchTermekek from "@/app/Fetching/fetch_termekek";

export default function ModifyTermekQty(webshopId: number, item : ShowItem, modifiedQty : number) {
    const modifyTermekekQty = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/item/setStock`, {
                webshopid: webshopId,
                sku: item.item.sku,
                stock: modifiedQty
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return FetchTermekek(webshopId);
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    return modifyTermekekQty();
}
