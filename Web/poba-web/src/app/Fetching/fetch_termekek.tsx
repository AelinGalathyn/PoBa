import {useEffect} from "react";
import axios from "axios";
import {useGlobal} from "@/app/Globals/global_values";

export default function FetchTermekek() {
    const {webshopId} = useGlobal();
    const {updateTermekek} = useGlobal();
    const fetchTermekek = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/item/all/`, {
                withCredentials: true,
                params: { webshopid: webshopId }
            });

            updateTermekek(response.data);
            console.log(webshopId);
        } catch (error) {
            console.log(error);
        }
    };

    fetchTermekek();
}
