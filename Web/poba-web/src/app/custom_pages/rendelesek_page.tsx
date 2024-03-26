import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useGlobal} from "@/app/Globals/global_values";
import FetchRendelesek from "@/app/Fetching/fetch_rendelesek";

export default function Rendelesek() {
    const {rendelesek, updateRendelesek, webshopId} = useGlobal();

    useEffect(() => {
        FetchRendelesek(webshopId).then(data => updateRendelesek(data));
    }, [webshopId]);

    return (
        <div className="fixed w-fit h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="h-full w-[25vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {rendelesek.map((rendeles) => (
                        <li key={rendeles.orderid}>
                            <Card className="bg-white m-2 rounded-md text-xs shadow-lg shadow-gray-400">
                                <CardHeader className="card-class text-xl font-bold flex justify-between">
                                    {rendeles.orderid}
                                    {/*{rendeles.*/}
                                    {/*    != "" && <Image src={rendeles.futar} width={30} height={30} alt="szallito_ceg_icon" className=""/>}*/}
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