"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useGlobal} from "@/app/Globals/global_values";
import {useEffect, useState} from "react";
import ShowItem from "@/DTOs/Termekek/ShowItem";

export default function Termekek() {
    const { termekek } = useGlobal();

    const [showTermekek, setShowTermekek] = useState<ShowItem[]>([]);

    useEffect(() => {
        let storedShowTermekek = localStorage.getItem("showTermekek");

        if (storedShowTermekek === null) {
            const initialShowTermekek = termekek.map(item => new ShowItem(item.id, item.sku, item.name, item.qty, item.unit, item.status, item.cat_name, item.url, item.pic_url, item.price, false));
            setShowTermekek(initialShowTermekek);
            localStorage.setItem("showTermekek", JSON.stringify(initialShowTermekek));
        } else {
            let fTermekek : ShowItem[] = JSON.parse(storedShowTermekek!);

            for (let item of termekek){
                if (!showTermekek.find(item2 => item2.id === item.id)){
                    fTermekek.push(new ShowItem(item.id, item.sku, item.name, item.qty, item.unit, item.status, item.cat_name, item.url, item.pic_url, item.price, false));
                }
            }

            setShowTermekek(fTermekek);
            localStorage.setItem("showTermekek", JSON.stringify(showTermekek));
        }
    }, [termekek]);

    const toggleShowItem = (id: number) => {
        setShowTermekek(prevShowTermekek =>
            prevShowTermekek.map(termek =>
                termek.id === id ? { ...termek, showItem: !termek.showItem } : termek
            )
        );
    };

    return (
        <div className="fixed w-[75vw] h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                    <CardHeader className="grid grid-cols-12 text-[16px] card-class font-bold">
                        <p className="col-span-1 ps-3">Sorszám</p>
                        <p className="col-span-1 text-center">Cikkszám</p>
                        <p className="col-span-3 text-center">Kategória</p>
                        <p className="col-span-3 ps-3 text-center">Termék neve</p>
                        <p className="col-span-1 ps-3 text-center">Darab</p>
                        <p className="col-span-2 ps-3 text-center">Ár</p>
                        <p className="col-start-12 col-span-1 ps-3 text-end">Státusz</p>
                    </CardHeader>
                </Card>
                <ul>
                    {showTermekek.map((termek, index) => (
                        <li key={termek.id}>
                            {termek.showItem ? (
                                <Card className={`text-[15px] cursor-pointer m-2 rounded-md p-1 shadow-lg shadow-gray-400 h-fit ${termek.qty === -1 ? "bg-gray-300" : "bg-white"}`}>
                                    <CardHeader className=" grid grid-cols-12 card-class" onClick={() => toggleShowItem(termek.id)}>
                                        <p className="col-span-1 ps-3">{index + 1}</p>
                                        <p className="col-span-12 ps-3 text-center">{termek.name}</p>
                                    </CardHeader>
                                    <CardBody className="grid grid-cols-12 card-class mt-5" onClick={() => toggleShowItem(termek.id)}>
                                        <p className="col-span-2 ps-3"><b>Azonosító:</b> {termek.sku}</p>
                                        <p className="col-span-2"><b>Kategóriák:</b>
                                            <ul>
                                                {termek.cat_name.map(item => <li>{item}</li>)}
                                            </ul>
                                        </p>
                                        <p className="col-span-2 text-center"><b>Ár:</b> {termek.price + " Ft"}</p>
                                    </CardBody>
                                    <CardFooter className="grid grid-cols-12 card-class mt-5">
                                    {termek.qty === 0 ? (
                                            <>
                                                <label className="col-span-1 ps-3 grid grid-cols-2">
                                                    <b>db:</b>
                                                    <input type="text" placeholder={termek.qty.toString()}/>
                                                </label>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/elfogyott_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : termek.qty > 0 && termek.qty <= 10 ? (
                                        <>
                                            <label className="col-span-1 ps-3 grid grid-cols-2">
                                                <b>db:</b>
                                                <input type="text" placeholder={termek.qty.toString()}/>
                                            </label>
                                            <div className="col-start-12 col-span-1 justify-self-end">
                                                <Image src="/kifogyoban_icon.png" width={30} height={30}
                                                       alt="szallito_ceg_icon"/>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label className="col-span-1 ps-3 grid grid-cols-2">
                                                <b>db:</b>
                                                <input type="text" placeholder={termek.qty.toString()}/>
                                            </label>
                                        </>
                                    )}
                                    </CardFooter>
                                </Card>
                            ) : (
                                <Card
                                    className={termek.qty === -1 ? "cursor-pointer bg-gray-300 m-2 rounded-md p-1 shadow-lg shadow-gray-400" : "cursor-pointer bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400"}>
                                    <CardHeader className="grid grid-cols-12 card-class text-[15px]" onClick={() => toggleShowItem(termek.id)}>
                                        <p className="col-span-1 ps-3">{index + 1}</p>
                                        <p className="col-span-1">{termek.sku}</p>
                                        <p className="col-span-3 text-center">{termek.cat_name.map(item => item + ", ")}</p>
                                        <p className="col-span-3 text-center">{termek.name}</p>
                                        {termek.qty === 0 ? (
                                            <>
                                                <p className="col-span-1 text-center">{termek.qty}</p>
                                                <p className="col-span-2 text-center">{termek.price + " Ft"}</p>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/elfogyott_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : termek.qty > 0 && termek.qty <= 10 ? (
                                            <>
                                                <p className="col-span-1 text-center">{termek.qty}</p>
                                                <p className="col-span-2 text-center">{termek.price + " Ft"}</p>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/kifogyoban_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="col-span-1 text-center">{termek.qty}</p>
                                                <p className="col-span-2 text-center">{termek.price + " Ft"}</p>
                                            </>
                                        )}
                                    </CardHeader>
                                </Card>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}