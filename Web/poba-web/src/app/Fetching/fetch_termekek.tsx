import axios, {AxiosResponse} from "axios";
import {FItem} from "@/DTOs/Termekek/FTermek";

export default function FetchTermekek(webshopId: number) : Promise<FItem[]> {
    const fetchTermekek = async () => {
        try {
            const response : AxiosResponse<FItem[]> = await axios.get(`http://localhost:3000/item/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error("Termékek lekérése a szervertől sikertelen volt.")
        }
    };

    return fetchTermekek();
}
