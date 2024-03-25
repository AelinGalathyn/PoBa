import {useEffect} from "react";
import axios from "axios";
import {useGlobal} from "@/app/Globals/global_values";
import FWebshop from "@/DTOs/Webshopok/FetchWebshop";

export default async function FetchWebshopok () {
    const {updateWebshopok} = useGlobal();

    try {
        const response = await axios.get(`http://localhost:3000/webshop/list`, {
            withCredentials: true
        });

        let webshopok : FWebshop[] = [];
        let responses : String[] = [response.data]
        responses.map(item => {
            let reszek = item.split(':');
            webshopok.push(new FWebshop(Number.parseInt(reszek[0]), reszek[1]));
        })

        console.log(webshopok)

        updateWebshopok(webshopok);

    } catch (error) {
        console.log(error);
    }
}
