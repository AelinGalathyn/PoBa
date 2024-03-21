"use client";
import {useEffect, useState} from "react";
import Termek from "@/app/Termekek/Termek";
import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useGlobal} from "@/app/webshop/webshopId";
import axios from "axios";

export default function Termekek() {
    const [termekek, setTermekek] = useState<Termek[]>([]);
    const { webshopId } = useGlobal();

    useEffect(() => {
        const fetchTermekek = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/item/all/`, {
                    withCredentials: true,
                    params: { webshopid: webshopId }
                });

                setTermekek(response.data);
                console.log(webshopId);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTermekek();
    }, [webshopId]);

    return (
        <div className="bg-emerald-600">
            <ul>
                {termekek.map((termek) => (
                    <li key={termek.Id}>
                        <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400 ">
                            <CardHeader className="grid grid-cols-3 text-xl card-class">
                                <p className="col-span-1 ps-3">{termek.name}</p>
                                <p className="col-span-1 text-center">{termek.qty}</p>
                                <div className="col-span-1 justify-self-end">
                                    {termek.qty === 0 ? (
                                        <Image src="/elfogyott_icon.png" width={30} height={30}
                                               alt="szallito_ceg_icon"/>
                                    ) : termek.qty > 0 && termek.qty <= 10 ? (
                                        <Image src="/kifogyoban_icon.png" width={30} height={30}
                                               alt="szallito_ceg_icon"/>
                                    ) : ("")}
                                </div>
                            </CardHeader>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    )
}