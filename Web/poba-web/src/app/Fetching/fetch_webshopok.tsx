import axios from "axios";

export default function FetchWebshopok()
{
    const fetchWebshopok = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/webshop/list`, {
                withCredentials: true
            });

            return response.data;

        } catch (error) {
            console.log(error);
        }
    }

    return fetchWebshopok();
}