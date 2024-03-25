import {useEffect} from "react";
import axios from "axios";
import exp from "node:constants";
import Item from "@/DTOs/Termekek/Termek";


export default function FetchTermekek(updateTermekek : (newValue: Item[]) => void, webshopId : number) {
    const fetchTermekek = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/item/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            updateTermekek(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchTermekek();
}