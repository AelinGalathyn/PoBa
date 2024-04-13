import {Card, CardHeader} from "@nextui-org/card";
import {Item} from "@/app/(DTOs)/Termekek/Termek";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import {createDatedItems, feltoltFogyoTermekek, sortedListItems} from "@/app/(Functions)/list_filtering";
import {fetch_termekek} from "@/app/(ApiCalls)/fetch";
import React, {useEffect, useState} from "react";

export default function KifogyoTermekek() {
    const [fogyoTermekek, setFogyoTermekek] = useState<Item[]>([])
    const [termekek, setTermekek] = useState<FItem[]>([])

    useEffect(() => {
        localStorage.setItem("fogyoTermekek", "[]");
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_termekek(webshopId).then(data => {
            setTermekek(data);

            let fogyoTermekekStorage: Item[] | null = JSON.parse(localStorage.getItem("fogyoTermekek") ?? "null");
            if (fogyoTermekekStorage === null) {
                localStorage.setItem("fogyoTermekek", JSON.stringify(createDatedItems(data)));
            } else if (fogyoTermekekStorage.length === 0) {
                localStorage.setItem("fogyoTermekek", JSON.stringify(sortedListItems(feltoltFogyoTermekek(data, fogyoTermekekStorage))));
                setFogyoTermekek(JSON.parse(localStorage.getItem("fogyoTermekek")!));
            } else {
                setFogyoTermekek(fogyoTermekekStorage);
            }
        });

    }, []);

    if (termekek.length === 0) {
        return <div className="h-[45vh] w-[45vw] flex justify-center items-center">
            <p>Loading...</p>
        </div>
    }

    return (
        <div className="md:w-11/12 md:max-h-2/5 mt-16">
            <div className="text-center">
                <h1 className="mb-5 text-[25px] font-bold drop-shadow-md">Kifogyóban lévő termékek</h1>
            </div>
            <div className="h-full w-full bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {fogyoTermekek.map((termek) => (
                        <li key={termek.fItem.id}>
                            <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400 ">
                                <CardHeader className="grid grid-cols-3 text-xl card-class">
                                    <p className="col-span-1 ps-3">{termek.fItem.name}</p>
                                    <p className="col-span-1 text-center">{termek.fItem.qty}</p>
                                    <div className="col-span-1 justify-self-end">
                                        {termek.fItem.qty === 0 ? (
                                            <img src="/elfogyott_icon.png" width={30} height={30} alt="elfogyott_icon" />
                                        ) : termek.fItem.qty > 0 ? (
                                            <img src="/kifogyoban_icon.png" width={30} height={30} alt="kifogyoban_icon" />
                                        ) : ("")}
                                    </div>
                                </CardHeader>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}