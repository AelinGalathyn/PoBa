"use client";

import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useGlobal} from "@/app/Globals/global_values";
import {useEffect} from "react";
import FetchTermekek from "@/app/Fetching/fetch_termekek";

export default function Termekek() {
    const { termekek, webshopId, updateTermekek } = useGlobal();

    useEffect(() => {
        FetchTermekek(webshopId).then(data => console.log(data));
    }, [webshopId]);

    return (
        <div className="fixed w-[75vw] h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                    <CardHeader className="grid grid-cols-12 text-xl card-class font-bold">
                        <p className="col-span-1 ps-3">Sorszám</p>
                        <p className="col-span-1 text-center">Cikkszám</p>
                        <p className="col-span-2 text-center">Kategória</p>
                        <p className="col-span-2 ps-3 text-center">Termék neve</p>
                        <p className="col-span-1 ps-3 text-center">Darab</p>
                        <p className="col-start-12 col-span-1 ps-3 text-end">Státusz</p>
                    </CardHeader>
                </Card>
                <ul>
                    {termekek.map((termek, index) => (
                        <li key={termek.id}>
                            <Card
                                className={termek.qty === -1 ? "bg-gray-300 m-2 rounded-md p-1 shadow-lg shadow-gray-400" : "bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400"}>
                                <CardHeader className="grid grid-cols-12 text-xl card-class">
                                    <p className="col-span-1 ps-3">{index + 1}</p>
                                    <p className="col-span-1">{termek.sku}</p>
                                    <p className="col-span-2 text-center">{termek.cat_name}</p>
                                    <p className="col-span-2 ps-3">{termek.name}</p>
                                    {termek.qty === 0 ? (
                                        <>
                                            <p className="col-span-1 text-center">{termek.qty}</p>
                                            <div className="col-start-12 col-span-1 justify-self-end">
                                                <Image src="/elfogyott_icon.png" width={30} height={30}
                                                       alt="szallito_ceg_icon"/>
                                            </div>
                                        </>
                                    ) : termek.qty > 0 && termek.qty <= 10 ? (
                                        <>
                                            <p className="col-span-1 text-center">{termek.qty}</p>
                                            <div className="col-start-12 col-span-1 justify-self-end">
                                                <Image src="/kifogyoban_icon.png" width={30} height={30}
                                                       alt="szallito_ceg_icon"/>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="col-span-1 text-center">{termek.qty}</p>
                                        </>
                                    )}
                                </CardHeader>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}