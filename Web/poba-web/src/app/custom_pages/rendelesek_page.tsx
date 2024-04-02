"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {useState} from "react";
import {rendelesHeader} from "@/app/FixData/lists";
import {CreateP} from "@/app/Functions/create_html_elements";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";

export default function Rendelesek() {
    const rendelesek : Orders[] = JSON.parse(localStorage.getItem("rendelesek")!);

    const [showSingleOrder, setShowSingleOrder] = useState(false);
    const [activeOrder, setActiveOrder] = useState(rendelesek[0]);

    return (
        <>
            {showSingleOrder ? (
                <div className="h-[95vh] w-[75vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                    <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400 h-fit">

                        <CardHeader className="grid grid-cols-12 card-class mb-3 mt-5">
                            <ArrowLeftIcon onClick={() => setShowSingleOrder(false)}/>
                            <p className="col-span-1 ps-3">{rendelesek.indexOf(activeOrder) + 1}</p>
                            <p className="col-span-10 text-center text-xl font-bold">{activeOrder.orderid}</p>
                        </CardHeader>

                        <CardBody className="grid grid-cols-12 card-class mt-5">
                            <p className="col-span-3 text-center"><b>Megrendelő:</b><br/> {activeOrder.customer.c_name}
                            </p>
                            <div className="col-span-3 text-center">
                                <p><b>Kosár tartalma:</b></p>
                                <ul>
                                    {activeOrder.items.map(item => <li
                                        key={Math.random() * 0.1}>{item.name} + {item.quantity}</li>)}
                                </ul>
                            </div>
                            <p className="col-span-3 text-center"><b>Fizetés típusa:</b><br/> {activeOrder.payment}</p>
                            <p className="col-span-2 text-center"><b>Nettó összeg:</b><br/> {activeOrder.gross + " Ft"}
                            </p>
                        </CardBody>

                        <CardFooter className="grid grid-cols-12 card-class mt-16 mb-5">
                            <p className="col-span-12 text-center"><b>Rendelés státusza:</b><br/> {activeOrder.status_id}
                            </p>
                        </CardFooter>

                    </Card>
                </div>
            ) : (
                <div className="fixed w-[75vw] h-3/4 mt-16">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
                    </div>
                    <div
                        className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                        <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                            <CardHeader className="grid grid-cols-12 text-[17px] card-class font-bold">
                                {rendelesHeader.map(item => CreateP(item.label, item.spacing + " text-center"))}
                            </CardHeader>
                        </Card>
                        <ul>
                            {rendelesek.map((rendeles, index) => (
                                <li key={rendeles.orderid} className="cursor-pointer" onClick={() => {
                                    setShowSingleOrder(true);
                                    setActiveOrder(rendeles)
                                }}>
                                    <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                                        <CardHeader className="grid grid-cols-12 text-[15px] card-class">
                                            <p className="col-span-1 ps-3">{index + 1}</p>
                                            <p className="col-span-2 text-center">{rendeles.orderid}</p>
                                            <p className="col-span-2 text-center">{rendeles.customer.c_name}</p>
                                            <p className="col-span-1 text-center">{rendeles.items.length}</p>
                                            <p className="col-span-2 text-center">{rendeles.payment}</p>
                                            <p className="col-span-2 text-center">{rendeles.gross + " Ft"}</p>
                                            <p className="col-start-11 col-span-2 text-center">{rendeles.status_id}</p>
                                        </CardHeader>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}