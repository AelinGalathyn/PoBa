"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {useState} from "react";
import {rendelesHeader} from "@/app/FixData/lists";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";

export default function Rendelesek() {
    const rendelesek : Orders[] = JSON.parse(localStorage.getItem("rendelesek")!);

    const [showSingleOrder, setShowSingleOrder] = useState(false);
    const [activeOrder, setActiveOrder] = useState(rendelesek[0]);

    return (
        <>
            {showSingleOrder ? (
                <div className="max-h-[95vh] w-[75vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                    <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">

                        <CardHeader className="grid grid-cols-12 card-class mt-5 mb-5">
                            <ArrowLeftIcon height={50} width={50} onClick={() => setShowSingleOrder(false)}/>
                            <p className="col-span-1 ps-3">{rendelesek.indexOf(activeOrder) + 1}</p>
                            <p className="col-span-8 text-center text-2xl font-bold">{activeOrder.orderid}</p>
                        </CardHeader>

                        <CardBody className="grid grid-rows-12 card-class">
                            <div className="row-span-4 grid grid-cols-12">
                                <div className="col-span-4 ps-10">
                                    <p className="text-center text-lg pb-5"><b>Megrendelői adatok</b></p>
                                    <p><b>Név:</b> {activeOrder.customer.c_name}</p>
                                    <p><b>Email cím:</b> {activeOrder.customer.email}</p>
                                    <p><b>Telefon:</b> {activeOrder.customer.c_mobile}</p>
                                </div>
                                <div className="col-start-9 col-span-2 text-center">
                                    <p className="pb-5"><b>Fizetés típusa:</b></p>
                                    <p>{activeOrder.payment}</p>
                                </div>
                                <div className="col-span-2 text-center">
                                    <p className="pb-5"><b>Nettó összeg:</b></p>
                                    <p>{activeOrder.gross + " Ft"}</p>
                                </div>
                            </div>
                            <div className="row-span-8">
                                <div className="px-10">
                                    <table className="w-full mt-5">
                                        <caption className="text-center text-xl mb-10 pt-5 border-t-8 border-gray-100 border-double"><b>Kosár tartalma</b></caption>
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
                                            {activeOrder.items.map(item =>
                                                <tr>
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
                            <p><b>Rendelés státusza:</b><br/> {activeOrder.status_id}</p>
                        </CardFooter>

                    </Card>
                </div>
            ) : (
                <div className="fixed w-[75vw] h-3/4 mt-16">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
                    </div>
                    <div className="max-h-full w-full mt-5 p-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                        <table className="w-full table-style">
                            <thead>
                                <tr>
                                    {rendelesHeader.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rendelesek.map((rendeles, index) => (
                                    <tr key={index} onClick={() => {
                                        setShowSingleOrder(true);
                                        setActiveOrder(rendeles)
                                    }} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{rendeles.orderid}</td>
                                        <td>{rendeles.customer.c_name}</td>
                                        <td>{rendeles.items.length}</td>
                                        <td>{rendeles.payment}</td>
                                        <td>{rendeles.gross + " Ft"}</td>
                                        <td>{rendeles.status_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}