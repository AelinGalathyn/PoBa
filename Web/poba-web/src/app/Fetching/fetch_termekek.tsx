import axios, {AxiosResponse} from "axios";
import {FItem} from "@/DTOs/Termekek/FTermek";
import {sortedListItems} from "@/app/Functions/list_filtering";
import {Item} from "@/DTOs/Termekek/Termek";

export default function FetchTermekek(webshopId: number) {
    const fetchTermekek = async () => {
        try {
            const response : AxiosResponse<FItem[]> = await axios.get(`http://localhost:3000/item/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            let now = new Date();

            localStorage.setItem("termekek", JSON.stringify(response.data));
            localStorage.setItem("datumosTermekek", JSON.stringify(sortedListItems(response.data.filter(item => item.qty <= 10 && item.qty >= 0).map(item =>
                new Item(item, now)).splice(0, 15))));

        } catch (error) {
            throw new Error("Termékek lekérése a szervertől sikertelen volt.")
        }
    };

    fetchTermekek();
}
