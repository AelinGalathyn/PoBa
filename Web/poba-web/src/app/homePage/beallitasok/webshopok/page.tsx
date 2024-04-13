"use client";

import {useEffect, useState} from "react";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {AddWebshop, DeleteWebshop} from "@/app/(ApiCalls)/modify";
import {useRouter} from "next/navigation";
import {TrashIcon} from "@heroicons/react/20/solid";

export default function WebshopokBeallitasok() {
    const [webshopok, setWebshopok] = useState<FWebshop[]>([]);
    const [apiKey, setApiKey] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        fetch_webshopok().then(data => setWebshopok(data));
    }, []);

    const handleOnclick = () => {
        if (apiKey) {
            AddWebshop(apiKey).then((data) => {
                console.log(data)
                localStorage.setItem("webshopId", JSON.stringify(data));
                fetch_webshopok().then(data => setWebshopok(data));
            })
        }
        else {
            alert("Az Api kulcs nem lehet üres");
            fetch_webshopok().then(data => setWebshopok(data));
        }
    }

    const handleDelete = (webshopId : number) => {
        DeleteWebshop(webshopId).then(() => {
            localStorage.setItem("webshopId", JSON.stringify(webshopok[0]));
            fetch_webshopok().then(data => setWebshopok(data));
        })
    }

    return (
        <div className="p-24 max-h-[85vh] overflow-hidden hover:overflow-auto scroll-smooth">
            <h1 className="text-3xl text-center mb-[5vh]">Csatolt Webshopok</h1>
            <ul className="space-y-2">
                {webshopok.map(item => (
                    <li key={Math.random() * 0.1} className="flex items-center justify-between border-2 border-gray-400 p-2 rounded-md text-xl">
                        {item.name}
                        <TrashIcon onClick={() => handleDelete(item.webshopid)} className="text-red-500" width={25} height={25} />
                    </li>
                ))}
            </ul>
            <div className="flex flex-col mt-[10vh] space-y-2 items-center">
                <input className="w-2/3 p-2 border-2 border-gray-400 rounded-md" placeholder="API kulcs" type="text" onChange={(e) => setApiKey(e.target.value)} />
                <button className="p-2 bg-[#A28B93] text-white rounded-md hover:bg-gray-200 hover:text-[#60624d] font-bold" onClick={handleOnclick}>Hozzáad</button>
            </div>
        </div>
    )

}