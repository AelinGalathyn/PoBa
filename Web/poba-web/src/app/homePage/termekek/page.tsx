"use client";

import React, { useEffect, useState } from "react";
import { FItem } from "@/app/(DTOs)/Termekek/FTermek";
import { fetch_termekek } from "@/app/(ApiCalls)/fetch";
import { Button } from "@nextui-org/react";
import { ModifyTermekQty } from "@/app/(ApiCalls)/modify";
import { ItemListFiltering, sortedListItems} from "@/app/(Functions)/list_filtering";
import {Item} from "@/app/(DTOs)/Termekek/Termek";
import {itemsFunctions, itemsHeader} from "@/app/(FixData)/lists";
import {CreateButton} from "@/app/(Functions)/create_html_elements";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

export default function Termekek() {
    const [showCorrectList, setShowCorrectList] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [termekek, setTermekek] = useState<FItem[]>([]);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    useEffect(() => {
        const webshopId: number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        const getApiCalls = async () => {
            const fetchedTermekek: FItem[] = await fetch_termekek(webshopId);
            setTermekek(fetchedTermekek);
        }
        getApiCalls();
    }, []);

    const toggleRow = (index: number) => {
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter(row => row !== index));
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    };

    const modify = async (modifiedTermek: FItem, modifiedQuantity: number) => {
        const webshopId: number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        await ModifyTermekQty(webshopId, modifiedTermek, modifiedQuantity);

        const newTermekek = await fetch_termekek(webshopId);
        setTermekek(newTermekek);

        const oldFogyoTermekek : Item[] = JSON.parse(localStorage.getItem("fogyoTermekek")!);

        newTermekek.map(item => {
            if (!oldFogyoTermekek.find(termek => termek.fItem.id === item.id) && item.qty <= 10 && item.qty >= 0) {
                oldFogyoTermekek.push(new Item(item, new Date()))
            } else {
                oldFogyoTermekek.map(termek => {
                    if (item === modifiedTermek && termek.fItem.id === item.id) {
                        termek.date = new Date();
                        return termek;
                    }
                    return termek;
                })
            }
        })

        console.log(sortedListItems(oldFogyoTermekek));
        localStorage.setItem("fogyoTermekek", JSON.stringify(sortedListItems(oldFogyoTermekek)));
    }

    return (
        <section className="col-start-3 ps-10">
            <div className="fixed w-[75vw] h-3/4 mt-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
                </div>
                <div className="mt-3 grid grid-cols-2">
                    <div className="space-x-2">
                        {itemsFunctions.map(item => CreateButton(item, () => setShowCorrectList(item)))}
                    </div>
                    <div className="flex justify-end items-center grid-cols-2">
                        <MagnifyingGlassIcon width={25} height={25}/>
                        <input className="ms-2 p-2 border-2 border-gray-300 rounded-md" type="text"
                               onClick={() => setShowCorrectList("Keresőmező")}
                               onChange={(e) => setSearch(e.target.value)}
                               defaultValue={search}
                        />
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
                            {ItemListFiltering(showCorrectList, termekek, search).map((termek, index) => (
                            expandedRows.includes(index) ? (
                                <tr key={termekek.findIndex(item => item.id === termek?.id)}
                                    className="h-fit border-b-8 border-gray-200 col-span-7 showing-row">
                                    <td colSpan={7}>
                                        <div className="grid grid-rows-3">
                                            <div className="row-span-1 grid grid-cols-12" onClick={() => toggleRow(index)}>
                                                <p className="col-span-1">{index + 1}</p>
                                                <p className="col-span-9 text-center">{termek?.sku}</p>
                                            </div>
                                            <div className="row-span-1 grid grid-cols-12" onClick={() => toggleRow(index)}>
                                                <img className="m-3 col-span-1" src={termek?.pic_url ?? ""} width={100} height={100}
                                                     alt="termek_kep"/>
                                                <div className="flex flex-col col-span-3">
                                                    <p><b>Név</b></p>
                                                    <p>{termek?.name}</p>
                                                </div>
                                                <div className="flex flex-col col-span-1">
                                                    <p><b>Cikkszám</b></p>
                                                    <p>{termek?.sku}</p>
                                                </div>
                                                <div className="flex flex-col col-span-1">
                                                    {termek.qty === -1 ? ("") : (
                                                        <>
                                                            <p><b>{termek.unit.toUpperCase()}</b></p>
                                                            <p>{termek?.qty + " " + termek?.unit}</p>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex flex-col col-span-1">
                                                    <p><b>Ár</b></p>
                                                    <p>{termek?.price + " Ft"}</p>
                                                </div>
                                            </div>
                                            <div className="row-span-1 flex justify-center">
                                                {termek.qty === -1 ? ("") : (
                                                    <div className="flex flex-col col-span-12">
                                                        <p><b>{termek.unit.toUpperCase()}</b></p>
                                                        <input className="p-1" type="number" id="qtyInput"
                                                               value={quantity} placeholder="Új mennyiség"
                                                               onChange={(e) => setQuantity(e.target.value)}/>
                                                        <Button
                                                            onClick={() => modify(termek, Number(quantity))}>Mentés</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={termek.id} onClick={() => toggleRow(index)}
                                    className={termek.qty === -1 ? "bg-gray-200" : ""}>
                                    <td>{index + 1}</td>
                                    <td>{termek.sku}</td>
                                    <td>{termek.cat_name.map(item => item + ", ")}</td>
                                    <td>{termek.name}</td>
                                    <td>{termek.qty === -1 ? "" : termek.qty + " " + termek.unit}</td>
                                    <td>{termek.price + " Ft"}</td>
                                    <td className="flex justify-end pe-2">{termek.qty === 0 ?
                                        (<img src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon" />)
                                        : termek.qty === -1 ? ""
                                            : termek.qty <= 10 ?
                                                (<img src="/kifogyoban_icon.png" width={30} height={30} alt="szallito_ceg_icon" />)
                                                : ""}</td>
                                </tr>
                            )
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
