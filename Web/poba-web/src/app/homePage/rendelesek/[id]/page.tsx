"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {useRouter} from "next/navigation";
import {fetch_rendeles, fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {useEffect, useState} from "react";

export default function SingleRendeles({ params } : any, {query} : any) {
    const [rendeles, setRendeles] = useState<Orders>({} as Orders);

    const router = useRouter();

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");

        fetch_rendeles(webshopId, params.id).then(data => {
            setRendeles(data);
        });

    }, []);

    if (!Object.keys(rendeles).length) {
        return <p className="h-full w-[90vw] flex justify-center items-center">Loading...</p>
    }

    return (
        <section className="col-span-1 md:col-start-3 md:ps-10">
            <div className="h-fit md:max-h-[95vh] md:w-[75vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">

                    <CardHeader className="grid grid-cols-12 card-class mt-5 mb-5">
                        <ArrowLeftIcon height={50} width={50} onClick={() => router.push(".")}/>
                        <p className="col-span-1 ps-3">{query}</p>
                        <p className="col-span-8 text-center text-2xl font-bold">{rendeles.orderid}</p>
                    </CardHeader>

                    <CardBody className="grid md:grid-rows-12 grid-rows-8 card-class">
                        <div className="row-span-4 grid grid-cols-12">
                            <div className="col-span-4 ps-10">
                                <p className="text-center text-lg pb-5"><b>Megrendelői adatok</b></p>
                                <p><b>Név:</b> {rendeles.customer.c_name}</p>
                                <p><b>Email cím:</b> {rendeles.customer.email}</p>
                                <p><b>Telefon:</b> {rendeles.customer.c_mobile}</p>
                            </div>
                            <div className="col-start-9 col-span-2 text-center">
                                <p className="pb-5"><b>Fizetés típusa:</b></p>
                                <p>{rendeles.payment}</p>
                            </div>
                            <div className="col-span-2 text-center">
                                <p className="pb-5"><b>Nettó összeg:</b></p>
                                <p>{rendeles.gross + " Ft"}</p>
                            </div>
                        </div>
                        <div className="row-span-8">
                            <div className="md:px-10">
                                <table className="w-full mt-5">
                                    <caption
                                        className="text-center text-xl mb-10 pt-5 border-t-8 border-gray-100 border-double">
                                        <b>Kosár tartalma</b></caption>
                                    <thead>
                                    <tr className="text-lg border-b-gray-100 border-b-2">
                                        <th>Név</th>
                                        <th>Cikkszám</th>
                                        <th>Nettó ár</th>
                                        <th>Bruttó ár</th>
                                        <th>Mennyiség</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rendeles.items.map(item =>
                                        <tr className="tr-side-borders">
                                            <td>{item.name}</td>
                                            <td>{item.sku}</td>
                                            <td>{item.net + " Ft"}</td>
                                            <td>{item.gross + " Ft"}</td>
                                            <td>{item.quantity + " db"}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className="flex card-class justify-center mt-10 mb-10">
                        <p><b>Rendelés státusza:</b><br/> {rendeles.status_id}</p>
                    </CardFooter>

                </Card>
            </div>
        </section>
    )
}