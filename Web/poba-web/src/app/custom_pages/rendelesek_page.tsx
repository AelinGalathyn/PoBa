"use client";

import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useGlobal} from "@/app/Globals/global_values";
import {useEffect} from "react";
import FetchTermekek from "@/app/Fetching/fetch_termekek";

export default function Rendelesek() {
    const { rendelesek } = useGlobal();

    console.log(rendelesek);

    return (
        <div className="fixed w-[75vw] h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                    <CardHeader className="grid grid-cols-12 text-xl card-class font-bold">
                        <p className="col-span-1 ps-3">Sorszám</p>
                        <p className="col-span-2 text-center">Rendelés ID</p>
                        <p className="col-span-2 text-center">Rendelő név</p>
                        <p className="col-span-1 ps-3 text-center">Termékek DB</p>
                        <p className="col-span-1 ps-3 text-center">Payment</p>
                        <p className="col-start-12 col-span-1 ps-3 text-end">Státusz</p>
                    </CardHeader>
                </Card>
                <ul>
                    {rendelesek.map((rendeles, index) => (
                        <li key={rendeles.orderid}>
                            <Card
                                className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                                <CardHeader className="grid grid-cols-12 text-xl card-class">
                                    <p className="col-span-1 ps-3">{index + 1}</p>
                                    <p className="col-span-2 text-center">{rendeles.orderid}</p>
                                    <p className="col-span-2 text-center">{rendeles.customer.c_name}</p>
                                    <p className="col-span-1 text-center">{rendeles.items.length}</p>
                                    <p className="col-span-2 text-center">{rendeles.payment}</p>
                                </CardHeader>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}