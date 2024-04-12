import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import {sortedListOrders} from "@/app/(Functions)/list_filtering";
import React, {useEffect, useState} from "react";

export default function JelenlegiRendelesek() {
    const [frissRendelesek, setFrissRendelesek] = useState<Orders[]>([])

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_rendelesek(webshopId).then(data => setFrissRendelesek(sortedListOrders(data)));
    }, []);

    if (frissRendelesek.length === 0) {
        return <p className="w-[25vw] h-full flex justify-center items-center">Loading...</p>
    }

    return (
        <div className="fixed w-fit max-h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="max-h-[75vh] w-[25vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {frissRendelesek.map((rendeles) => (
                        <li key={rendeles.orderid}>
                            <Card className="bg-white m-2 rounded-md text-xs shadow-lg shadow-gray-400">
                                <CardHeader className="card-class text-xl font-bold flex justify-between">
                                    {rendeles.orderid}
                                    {rendeles.sender.toString().toLowerCase().includes("gls") ? (<img src="/gls_logo.png" width={30} height={30} alt="szallito_ceg_icon"/>) :
                                        rendeles.sender.toString().toLowerCase().includes("foxpost") ? (<img src="/foxpost_logo.png" width={30} height={30} alt="szallito_ceg_icon"/>) :
                                            rendeles.sender.toString().toLowerCase().includes("posta") ||  rendeles.sender.toString().toLowerCase().includes("mpl")?
                                                (<img src="/magyar_icon.png" width={30} height={30} alt="szallito_ceg_icon"/>) : ("")}
                                </CardHeader>
                                <CardBody className="text-[15px] card-class">{rendeles.customer.c_name}</CardBody>
                                <CardFooter className="card-class">{rendeles.date.toString()}</CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}