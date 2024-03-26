import axios from "axios";

export default function FetchTermekek(webshopId : number) {
    const fetchTermekek = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/item/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            return response.data
        } catch (error) {
            console.log(error);
        }
    };

    return fetchTermekek();
}