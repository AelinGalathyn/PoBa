"use client";

import {ItemListFiltering} from "@/app/(Functions)/list_filtering";
import {redirect} from "next/navigation";
import React, {useEffect, useState} from "react";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import { fetch_termekek} from "@/app/(ApiCalls)/fetch";
import {Button} from "@nextui-org/react";
import {ModifyTermekQty} from "@/app/(ApiCalls)/modify";

export default function Termekek({searchParams,}: {
    searchParams: {
        searchParams: string,
        correctList: string
    }
}) {

    const [quantity, setQuantity] = useState<string>("");
    const [termekek, setTermekek] = useState<FItem[]>([]);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    useEffect(() => {
        const webshopId : number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
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

    const modify = async (termek : FItem) => {
        const webshopId : number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        await ModifyTermekQty(webshopId, termek , Number.parseInt(quantity));
    }

    return <>
        {ItemListFiltering(searchParams.correctList, termekek, searchParams.searchParams).map((termek, index) => (
            expandedRows.includes(index) ? (
                <tr key={termekek.findIndex(item => item.id === termek?.id)} className="h-fit border-b-8 border-gray-200 col-span-7 showing-row">
                    <td colSpan={7}>
                        <div className="grid grid-rows-3">
                            <div className="row-span-1 grid grid-cols-12" onClick={() => toggleRow(index)}
                            >
                                <p className="col-span-1">{index + 1}</p>
                                <p className="col-span-9 text-center">{termek?.sku}</p>
                            </div>
                            <div className="row-span-1 grid grid-cols-12" onClick={() => toggleRow(index)}
                            >
                                <img className="m-3 col-span-1" src={termek?.pic_url ?? ""} width={100}
                                       height={100} alt="termek_kep" />
                                <div className="flex flex-col col-span-3">
                                    <p><b>Név</b></p>
                                    <p>{termek?.name}</p>
                                </div>
                                <div className="flex flex-col col-span-1">
                                    <p><b>Cikkszám</b></p>
                                    <p>{termek?.sku}</p>
                                </div>
                                <div className="flex flex-col col-span-1">
                                    <p><b>Darab</b></p>
                                    <p>{termek?.qty + " " + termek?.unit}</p>
                                </div>
                                <div className="flex flex-col col-span-1">
                                    <p><b>Ár</b></p>
                                    <p>{termek?.price + " Ft"}</p>
                                </div>
                            </div>
                            <div className="row-span-1 flex justify-center">
                                <div className="flex flex-col col-span-12">
                                    <p><b>Darab</b></p>
                                    <input type="number" id="qtyInput" placeholder={termek?.qty.toString()} onChange={(e) => setQuantity(e.target.value)} />
                                    <Button onClick={() => modify(termek)}>Mentés</Button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            ) : (
                <tr key={termek.id} onClick={() => toggleRow(index)} className={termek.qty === -1 ? "bg-gray-200" : ""}>
                    <td>{index + 1}</td>
                    <td>{termek.sku}</td>
                    <td>{termek.cat_name.map(item => item + ", ")}</td>
                    <td>{termek.name}</td>
                    <td>{termek.qty === -1 ? "" : termek.qty + " " + termek.unit}</td>
                    <td>{termek.price + " Ft"}</td>
                    <td className="flex justify-end pe-2">{termek.qty === 0 ?
                        (<img src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon"/>)
                        : termek.qty === -1 ? ""
                            : termek.qty <= 10 ?
                                (<img src="/kifogyoban_icon.png" width={30} height={30}
                                      alt="szallito_ceg_icon"/>)
                                : ""}</td>
                </tr>
            )
        ))}
    </>
}