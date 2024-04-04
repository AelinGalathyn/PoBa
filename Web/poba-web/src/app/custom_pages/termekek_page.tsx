"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import ShowItem from "@/DTOs/Termekek/ShowItem";
import ModifyTermekQty from "@/app/Modify/modify_termek";
import {itemsFunctions, itemsHeader, rendelesHeader} from "@/app/FixData/lists";
import {CreateButton, CreateP} from "@/app/Functions/create_html_elements";
import {ItemListFiltering} from "@/app/Functions/list_filtering";
import {FItem} from "@/DTOs/Termekek/FTermek";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

export default function Termekek() {
    const termekek : FItem[] = JSON.parse(localStorage.getItem("termekek")!);
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);

    const [showTermekek, setShowTermekek] = useState<ShowItem[]>([]);
    const [showCorrectList, setShowCorrectList] = useState<string>("");
    const [keresoKifejezes, setKeresoKifejezes] = useState<string>("");

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
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}