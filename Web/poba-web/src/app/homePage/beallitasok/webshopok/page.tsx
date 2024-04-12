"use client";

import {useEffect, useState} from "react";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {AddWebshop} from "@/app/(ApiCalls)/modify";
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
        AddWebshop(apiKey).then((data) => {
            localStorage.setItem("webshopId", JSON.stringify(data));
            router.push("/homePage");
        })
    }

    return (
        <div>
            <ul className="p-16">
                {webshopok.map(item => (
                    <li key={Math.random() * 0.1} className="flex items-center justify-between">
                        {item.name}
                        <TrashIcon width={25} height={25} />
                    </li>
                ))}
            </ul>
            <div>
                <input type="text" onChange={(e) => setApiKey(e.target.value)} />
                <button onClick={handleOnclick}>Hozzáad</button>
            </div>
        </div>
    )

}