import axios from "axios";

export default function FetchRendelesek(webshopId : number) {
    const fetchRendelesek = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/orders/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            localStorage.setItem("rendelesek", JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    fetchRendelesek();
}