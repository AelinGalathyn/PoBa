"use client";

import {useEffect, useState} from "react";
import Termek from "@/DTOs/Termekek/Termek";
import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useGlobal} from "@/app/Globals/global_values";
import axios from "axios";
import FetchTermekek from "@/app/Fetching/fetch_termekek";
import FetchWebshopok from "@/app/Fetching/fetch_webshopok";

export default function Termekek() {
    const { termekek, updateTermekek } = useGlobal();
    const { webshopId } = useGlobal();

    useEffect(() => {
        FetchTermekek(updateTermekek, webshopId);
    }, [webshopId]);


    return (
        <div className="fixed w-[75vw] h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {termekek.map((termek) => (
                        <li key={termek.Id}>
                            <Card className={termek.qty === -1 ? "bg-gray-300 m-2 rounded-md p-1 shadow-lg shadow-gray-400" : "bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400"}>
                                <CardHeader className="grid grid-cols-3 text-xl card-class">
                                    <p className="col-span-1 ps-3">{termek.name}</p>
                                    {termek.qty === 0 ? (
                                        <>
                                            <p className="col-span-1 text-center">{termek.qty}</p>
                                            <div className="col-span-1 justify-self-end">
                                                <Image src="/elfogyott_icon.png" width={30} height={30}
                                                       alt="szallito_ceg_icon"/>
                                            </div>
                                        </>
                                    ) : termek.qty > 0 && termek.qty <= 10 ? (
                                        <>
                                            <p className="col-span-1 text-center">{termek.qty}</p>
                                            <div className="col-span-1 justify-self-end">
                                                <Image src="/kifogyoban_icon.png" width={30} height={30}
                                                       alt="szallito_ceg_icon"/>
                                            </div>
                                        </>
                                    ) : ("")}
                                </CardHeader>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}