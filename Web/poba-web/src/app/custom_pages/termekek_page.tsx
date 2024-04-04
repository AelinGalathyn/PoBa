"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import ShowItem from "@/DTOs/Termekek/ShowItem";
import ModifyTermekQty from "@/app/Modify/modify_termek";
import {itemsFunctions, itemsHeader} from "@/app/FixData/lists";
import {CreateButton} from "@/app/Functions/create_html_elements";
import {ItemListFiltering} from "@/app/Functions/list_filtering";
import {FItem} from "@/DTOs/Termekek/FTermek";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";

export default function Termekek() {
    const termekek : FItem[] = JSON.parse(localStorage.getItem("termekek")!);
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);

    const [showTermekek, setShowTermekek] = useState<ShowItem[]>([]);
    const [showCorrectList, setShowCorrectList] = useState<string>("");
    const [keresoKifejezes, setKeresoKifejezes] = useState<string>("");
    const [newQty, setNewQty] = useState<string>("");

    useEffect(() => {
        setShowTermekek(termekek.map(item => new ShowItem(item, false)));
    }, [webshopId]);

    const toggleShowItem = (id: number) => {
        setShowTermekek(prevShowTermekek =>
            prevShowTermekek.map(termek =>
                termek.item.id === id ? { ...termek, showItem: !termek.showItem } : termek
            )
        );
    };

    const modifyItemQty = (item : ShowItem, qty : string) => {
        let modifiedQty = Number.parseInt(qty);
        ModifyTermekQty(webshopId, item, modifiedQty).then(data => localStorage.setItem("termekek", JSON.stringify(data)));
    }

    return (
        <div className="fixed w-[75vw] h-3/4 mt-5">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
            </div>
            <div className="mt-3 grid grid-cols-2">
                <div className="space-x-2">
                    {itemsFunctions.map(item => CreateButton(item, () => setShowCorrectList(item)))}
                </div>
                <div className="flex justify-end items-center grid-cols-2">
                    <MagnifyingGlassIcon width={25} height={25} />
                    <input className="ms-2 p-2 border-2 border-gray-300 rounded-md" type="text" onClick={() => setShowCorrectList("Keresőmező")}
                           onChange={(e) => setKeresoKifejezes(e.target.value)}/>
                </div>
            </div>
            <div
                className="max-h-full w-full mt-5 p-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <table className="w-full table-style">
                    <thead>
                    <tr>
                        {itemsHeader.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {ItemListFiltering(showCorrectList, showTermekek, keresoKifejezes).map((termek, index) => (
                        termek.showItem ? (
                            <tr key={index} className="h-fit border-b-8 border-gray-200 col-span-7 showing-row">
                                <td colSpan={7}>
                                    <div className="grid grid-rows-3">
                                        <div className="row-span-1 grid grid-cols-12" onClick={() => {toggleShowItem(termek.item.id)}}>
                                            <p className="col-span-1">{termekek.findIndex(item => item.id === termek.item.id) + 1}</p>
                                            <p className="col-span-9 text-center">{termek.item.sku}</p>
                                        </div>
                                        <div className="row-span-1 grid grid-cols-12" onClick={() => {toggleShowItem(termek.item.id)}}>
                                            <Image className="m-3 col-span-1" src={termek.item.pic_url} width={100}
                                                   height={100} alt="termek_kep"/>
                                            <div className="flex flex-col col-span-3">
                                                <p><b>Név</b></p>
                                                <p>{termek.item.name}</p>
                                            </div>
                                            <div className="flex flex-col col-span-1">
                                                <p><b>Cikkszám</b></p>
                                                <p>{termek.item.sku}</p>
                                            </div>
                                            <div className="flex flex-col col-span-1">
                                                <p><b>Darab</b></p>
                                                <p>{termek.item.qty}</p>
                                            </div>
                                        </div>
                                        <div className="row-span-1 flex justify-center">
                                            <div className="flex flex-col col-span-12">
                                                <p><b>Darab</b></p>
                                                <Input type="number" placeholder={termek.item.qty.toString()} onChange={(e) => setNewQty(e.target.value)}/>
                                                <Button onClick={() => modifyItemQty(termek, newQty)}>Mentés</Button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr key={index} onClick={() => {
                                toggleShowItem(termek.item.id);
                            }} className={termek.item.qty === -1 ? "bg-gray-200" : ""}>
                                <td>{index + 1}</td>
                                <td>{termek.item.sku}</td>
                                <td>{termek.item.cat_name.map(item => item + ", ")}</td>
                                <td>{termek.item.name}</td>
                                <td>{termek.item.qty === -1 ? "" : termek.item.qty}</td>
                                <td>{termek.item.price + " Ft"}</td>
                                <td className="flex justify-end pe-2">{termek.item.qty === 0 ?
                                    (<Image src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon"/>)
                                    : termek.item.qty === -1 ? ""
                                        : termek.item.qty <= 10 ?
                                            (<Image src="/kifogyoban_icon.png" width={30} height={30}
                                                    alt="szallito_ceg_icon"/>)
                                            : ""}</td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}