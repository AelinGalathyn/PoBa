import {Card, CardHeader} from "@nextui-org/card";
import {Item} from "@/app/(DTOs)/Termekek/Termek";
import {FItem} from "@/app/(DTOs)/Termekek/FTermek";
import {createDatedItems, sortedListOrders} from "@/app/(Functions)/list_filtering";
import {fetch_termekek} from "@/app/(ApiCalls)/fetch";
import {useEffect, useState} from "react";

export default function KifogyoTermekek() {
    const [fogyoTermekek, setFogyoTermekek] = useState<Item[]>([])

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        const getTermekek = async () => {
            const termekek : FItem[] = await fetch_termekek(webshopId);
            setFogyoTermekek(createDatedItems(termekek));
        }

        getTermekek();
    }, []);

    return (
        <div className="fixed h-2/6 w-2/5 mt-[5vh]">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Kifogyóban lévő termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
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