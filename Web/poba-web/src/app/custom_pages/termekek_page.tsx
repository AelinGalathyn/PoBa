"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import ShowItem from "@/DTOs/Termekek/ShowItem";
import ModifyTermekQty from "@/app/Modify/modify_termek";
import {itemsFunctions, itemsHeader} from "@/app/FixData/lists";
import {CreateButton, CreateP} from "@/app/Functions/create_html_elements";
import {ItemListFiltering} from "@/app/Functions/list_filtering";
import {FItem} from "@/DTOs/Termekek/FTermek";

export default function Termekek() {
    const termekek : FItem[] = JSON.parse(localStorage.getItem("termekek")!);
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);

    const [showTermekek, setShowTermekek] = useState<ShowItem[]>([]);
    const [showTermekekFilter, setShowTermekekFilter] = useState<ShowItem[]>([]);
    const [showCorrectList, setShowCorrectList] = useState<string>("");

    useEffect(() => {
        setShowTermekek(termekek.map(item => new ShowItem(item, false)));
        setShowTermekekFilter(showTermekek);
    }, [webshopId]);

    const toggleShowItem = (id: number) => {
        setShowTermekek(prevShowTermekek =>
            prevShowTermekek.map(termek =>
                termek.item.id === id ? { ...termek, showItem: !termek.showItem } : termek
            )
        );
    };

    const modifyItemQty = (item : ShowItem) => {
        ModifyTermekQty(webshopId, item).then(data => localStorage.setItem("termekek", JSON.stringify(data)));
    }

    return (
        <div className="fixed w-[75vw] h-3/4 mt-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
            </div>
            <div className="space-x-2 mt-3">
                {itemsFunctions.map(item => CreateButton(item, () => setShowCorrectList(item)))}
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400">
                    <CardHeader className="grid grid-cols-12 text-[16px] card-class font-bold">
                        {itemsHeader.map(item => CreateP(item.label, item.spacing + " text-center"))}
                    </CardHeader>
                </Card>
                <ul>
                    {ItemListFiltering(showTermekekFilter, showCorrectList, showTermekek).map((termek, index) => (
                        <li key={termek.item.id} className="cursor-pointer">
                            {termek.showItem ? (
                                <Card className={`text-[15px] m-2 rounded-md p-1 shadow-lg shadow-gray-400 h-fit ${termek.item.qty === -1 ? "bg-gray-300" : "bg-white"}`}>

                                    <CardHeader className=" grid grid-cols-12 card-class" onClick={() => toggleShowItem(termek.item.id)}>
                                        <p className="col-span-1 ps-3">{index + 1}</p>
                                        <p className="col-span-10 text-center text-xl font-bold mb-3 mt-5">{termek.item.name}</p>
                                    </CardHeader>

                                    <CardBody className="grid grid-cols-12 card-class mt-5" onClick={() => toggleShowItem(termek.item.id)}>
                                        <p className="col-span-2 text-center"><b>Azonosító:</b><br/> {termek.item.sku}</p>
                                        <div className="col-span-3 text-center">
                                            <p><b>Kategóriák:</b></p>
                                            <ul>
                                                {termek.item.cat_name.map(item => <li key={Math.random() * 0.1}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <p className="col-span-2 text-center"><b>Ár:</b><br/> {termek.item.price + " Ft"}</p>
                                        <p className="flex col-span-5 justify-center"><Image src={termek.item.pic_url} width={100} height={100} alt="termek_kep"/></p>
                                    </CardBody>

                                    <CardFooter className="grid grid-cols-12 card-class mt-5">
                                        {termek.item.qty === 0 ? (
                                            <>
                                                <label className="col-span-1 ps-3 grid grid-cols-2">
                                                    <b>db:</b>
                                                    <input type="text" placeholder={termek.item.qty.toString()} onInput={() => modifyItemQty(termek)}/>
                                                </label>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/elfogyott_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : termek.item.qty > 0 && termek.item.qty <= 10 ? (
                                            <>
                                                <label className="col-span-1 ps-3 grid grid-cols-2">
                                                    <b>db:</b>
                                                    <input type="text" placeholder={termek.item.qty.toString()} onInput={() => modifyItemQty(termek)}/>
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
                                                    <input type="text" placeholder={termek.item.qty.toString()} onInput={() => modifyItemQty(termek)}/>
                                                </label>
                                            </>
                                        )}
                                    </CardFooter>
                                </Card>
                            ) : (
                                <Card
                                    className={termek.item.qty === -1 ? "bg-gray-300 m-2 rounded-md p-1 shadow-lg shadow-gray-400" : "cursor-pointer bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400"}>
                                    <CardHeader className="grid grid-cols-12 card-class text-[15px]" onClick={() => toggleShowItem(termek.item.id)}>
                                        <p className="col-span-1 ps-3">{index + 1}</p>
                                        <p className="col-span-1">{termek.item.sku}</p>
                                        <p className="col-span-4 text-center">{termek.item.cat_name.map(item => item + ", ")}</p>
                                        <p className="col-span-2 text-center">{termek.item.name}</p>
                                        {termek.item.qty === 0 ? (
                                            <>
                                                <p className="col-span-1 text-center">{termek.item.qty}</p>
                                                <p className="col-span-2 text-center">{termek.item.price + " Ft"}</p>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/elfogyott_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : termek.item.qty > 0 && termek.item.qty <= 10 ? (
                                            <>
                                                <p className="col-span-1 text-center">{termek.item.qty}</p>
                                                <p className="col-span-2 text-center">{termek.item.price + " Ft"}</p>
                                                <div className="col-start-12 col-span-1 justify-self-end">
                                                    <Image src="/kifogyoban_icon.png" width={30} height={30}
                                                           alt="szallito_ceg_icon"/>
                                                </div>
                                            </>
                                        ) : termek.item.qty === -1 ? (
                                            <>
                                                <p className="col-span-1 text-center"></p>
                                                <p className="col-span-2 text-center">{termek.item.price + " Ft"}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="col-span-1 text-center">{termek.item.qty}</p>
                                                <p className="col-span-2 text-center">{termek.item.price + " Ft"}</p>
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