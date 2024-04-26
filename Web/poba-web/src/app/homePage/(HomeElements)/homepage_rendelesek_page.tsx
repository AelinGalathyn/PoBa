import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import {sortedListOrders} from "@/app/(Functions)/list_filtering";
import React, {useEffect, useState} from "react";

export default function JelenlegiRendelesek() {
    const [frissRendelesek, setFrissRendelesek] = useState<Orders[]>([])
    const [szallitoiCegek, setSzallitoiCegek] = useState<string[]>([])

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_rendelesek(webshopId).then(data => {
            setFrissRendelesek(sortedListOrders(data));
            setSzallitoiCegek(["gls", "foxpost", "posta", "mpl"])
        });
    }, []);

    const renderImage = (src : string) => {
        return <img src={src} width={30} height={30} alt="szallito_ceg_icon"/>
    }

    const isContains = (amibeKeresed : Orders, parameter : string) => {
        return amibeKeresed.sender.toString().toLowerCase().includes(parameter)
    }

    const renderSzallitoIcon = (rendeles : Orders, szallitoiCegek : string[]) => {
        return isContains(rendeles, szallitoiCegek[0]) ? (renderImage(`/${szallitoiCegek[0]}_logo.png`)) :
            isContains(rendeles, szallitoiCegek[1]) ? (renderImage(`/${szallitoiCegek[1]}_logo.png`)) :
                isContains(rendeles, szallitoiCegek[2]) ||  isContains(rendeles, szallitoiCegek[3])?
                    (renderImage(`/${szallitoiCegek[2]}_logo.png`)) : ("")
    }

    if (frissRendelesek === undefined || frissRendelesek.length === 0) {
        return <p className="w-[25vw] h-full flex justify-center items-center">Loading...</p>
    }

    return (
        <div className="w-full md:mt-16">
            <div className="text-center">
                <h1 className="text-[25px] font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="h-full p-0.5 lg:max-h-[75vh] w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner md:overflow-hidden md:hover:overflow-auto md:scroll-smooth">
                <ul>
                    {frissRendelesek.map((rendeles) => (
                        <li key={rendeles.orderid}>
                            <Card className="bg-white m-2 rounded-md text-[12px] shadow-lg shadow-gray-400">
                                <CardHeader className="card-class text-[20px] font-bold flex justify-between">
                                    {rendeles.orderid}
                                    {renderSzallitoIcon(rendeles, szallitoiCegek)}
                                </CardHeader>
                                <CardBody className="text-[18px] card-class">{rendeles.customer.c_name}</CardBody>
                                <CardFooter className="card-class">{rendeles.date.toString()}</CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}