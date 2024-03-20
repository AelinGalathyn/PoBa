"use client";
import {useEffect, useState} from "react";
import Termek from "@/app/Termekek/Termek";
import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";

export default function Termekek() {
    const [termekek, setTermekek] = useState<Termek[]>([]);

    useEffect(() => {
        const fetchTermekek = () => {
            fetch("http://localhost:3000/item/all")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setTermekek(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchTermekek();
    }, []);

    return (
        <div>
            <ul>
                {termekek.map((termek) => (
                    <li key={termek.id}>
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