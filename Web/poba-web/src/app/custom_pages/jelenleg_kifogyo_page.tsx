import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Item} from "@/DTOs/Termekek/Termek";
import {FItem} from "@/DTOs/Termekek/FTermek";

export default function KifogyoTermekek() {
    const termekek : FItem[] = JSON.parse(localStorage.getItem("termekek")!);
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);
    const [fogyoTermekek, setFogyoTermekek] = useState<Item[]>([]);

    useEffect(() => {
        let now = new Date();

        setFogyoTermekek(sortedList(termekek.filter(item => item.qty <= 10 && item.qty >= 0).map(item =>
            new Item(item, now)
        ).slice(0, 15)));

    }, [webshopId]);

    const sortedList = (list: Item[]) => {
        return list.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }

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
                                            <Image src="/elfogyott_icon.png" width={30} height={30} alt="elfogyott_icon" />
                                        ) : termek.fItem.qty > 0 ? (
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