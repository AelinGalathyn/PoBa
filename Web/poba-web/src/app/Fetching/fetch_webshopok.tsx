import axios from "axios";
import FWebshop from "@/DTOs/Webshopok/FetchWebshop";

export default function FetchWebshopok(updateWebshopok :  (newValue: FWebshop[]) => void)
{
    const fetchWebshopok = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/webshop/list`, {
                withCredentials: true
            });

            updateWebshopok(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    fetchWebshopok();
}