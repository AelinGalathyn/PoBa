import axios from "axios";

export default function FetchWebshopok()
{
    const fetchWebshopok = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/webshop/list`, {
                withCredentials: true
            });

            localStorage.setItem("webshopok", JSON.stringify(response.data));

        } catch (error) {
            console.log(error);
        }
    }

    fetchWebshopok();
}