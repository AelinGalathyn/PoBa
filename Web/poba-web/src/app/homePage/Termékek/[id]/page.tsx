"use client";

import Image from "next/image";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import {fetch_termek} from "@/app/(ApiCalls)/fetch";
import {webshopid} from "@/app/(FixData)/variables";
import {redirect} from "next/navigation";
import {ModifyTermekQty} from "@/app/(ApiCalls)/modify";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import React, {useEffect, useState} from "react";

export default function SingleTermekLayout({ params } : any) {
    const [quantity, setQuantity] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [termek, setTermek] = useState<FItem | null>(null);
    const [termekek, setTermekek] = useState<FItem[]>([]);

    useEffect(() => {
        const fetchTermek = async () => {
            const fetchedTermek: FItem = await fetch_termek(webshopid.webshopid, params.id);
            const fetchedTermekek: FItem[] = await fetch_termek(webshopid.webshopid, params.id);
            setTermek(fetchedTermek);
            setTermekek(fetchedTermekek);
            setIndex(termekek.findIndex(item => item.id === termek?.id))
        };
        fetchTermek().catch(e => console.log(e));
    }, [params.id]);

    const modify = async () => {
            await ModifyTermekQty(webshopid.webshopid, termek! , Number.parseInt(quantity));
    }

    return (
        <tr key={index} className="h-fit border-b-8 border-gray-200 col-span-7 showing-row">
            <td colSpan={7}>
                <div className="grid grid-rows-3">
                    <div className="row-span-1 grid grid-cols-12" onClick={() => {
                        redirect("/Termékek")
                    }}>
                        <p className="col-span-1">{index + 1}</p>
                        <p className="col-span-9 text-center">{termek?.sku}</p>
                    </div>
                    <div className="row-span-1 grid grid-cols-12" onClick={() => {
                        redirect("/Termékek")
                    }}>
                        <Image className="m-3 col-span-1" src={termek?.pic_url ?? ""} width={100}
                               height={100} alt="termek_kep"/>
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
                            <Input type="number" id="qtyInput" placeholder={termek?.qty.toString()} onChange={(e) => setQuantity(e.target.value)}/>
                            <Button onClick={() => modify()}>Mentés</Button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}