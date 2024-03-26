import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useGlobal} from "@/app/Globals/global_values";
import FetchTermekek from "@/app/Fetching/fetch_termekek";
import {Item} from "@/DTOs/Termekek/Termek";

export default function KifogyoTermekek() {
    const { webshopId } = useGlobal();
    const { termekek, updateTermekek } = useGlobal();

    const [fogyoTermekek, setFogyoTermekek] = useState<Item[]>([]);

    useEffect(() => {
        FetchTermekek(webshopId).then(data => updateTermekek(data));
    }, [webshopId]);

    useEffect(() => {
        setFogyoTermekek(termekek);
    }, [termekek]);


    useEffect(() => {
        setFogyoTermekek(termekek.filter(item => item.qty <= 10).sort(
            (a, b) => {
                if (a.qty === 0 && b.qty !== 0) {
                    return -1; // a comes before b
                } else if (a.qty !== 0 && b.qty === 0) {
                    return 1; // b comes before a
                } else {
                    // If quantities are the same, sort by quantity change date
                    //return new Date(a.quantityChangeDate) - new Date(b.quantityChangeDate); //TODO: dátum szerinti frissítés és rendezés
                    return 0;
                }}
        ).splice(0, 15));
    }, [termekek]);

    return (
        <div className="fixed h-2/6 w-2/5 mt-[5vh]">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Kifogyóban lévő termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {fogyoTermekek.map((termek) => (
                        <li key={termek.id}>
                            <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400 ">
                                <CardHeader className="grid grid-cols-3 text-xl card-class">
                                    <p className="col-span-1 ps-3">{termek.name}</p>
                                    <p className="col-span-1 text-center">{termek.qty}</p>
                                    <div className="col-span-1 justify-self-end">
                                        {termek.qty === 0 ? (
                                            <Image src="/elfogyott_icon.png" width={30} height={30} alt="elfogyott_icon" />
                                        ) : termek.qty > 0 ? (
                                            <Image src="/kifogyoban_icon.png" width={30} height={30} alt="kifogyoban_icon" />
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