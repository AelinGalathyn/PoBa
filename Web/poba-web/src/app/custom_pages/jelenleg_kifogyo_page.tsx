import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useGlobal} from "@/app/Globals/global_values";
import FetchTermekek from "@/app/Fetching/fetch_termekek";
import FItem from "@/DTOs/Termekek/Termek";

export default function KifogyoTermekek() {
    const { webshopId } = useGlobal();
    const { termekek, updateTermekek } = useGlobal();

    const [fogyoTermekek, setFogyoTermekek] = useState<FItem[]>([]);

    useEffect(() => {
        FetchTermekek(webshopId).then(data => updateTermekek(data));
    }, [webshopId]);

    useEffect(() => {
        let IFogyoTermekek = localStorage.getItem("fogyoTermekek");
        let now = new Date();

        if (IFogyoTermekek === null) {
            setFogyoTermekek(sortedList(termekek.filter(item => item.qty <= 10).map(item =>
                new FItem(item.id, item.sku, item.name, item.qty, item.unit, item.status, item.cat_name, item.url, item.pic_url, now)
            ).slice(0, 15)));

            localStorage.setItem("fogyotermekek", JSON.stringify(sortedList(fogyoTermekek)));
        }
        else {
            let fTermekek : FItem[] = JSON.parse(IFogyoTermekek!);

            for (let item of termekek){
                if (!fogyoTermekek.find(item2 => item2.id === item.id) && item.qty <= 10){
                    fTermekek.push(new FItem(item.id, item.sku, item.name, item.qty, item.unit, item.status, item.cat_name, item.url, item.pic_url, now));
                }
            }

            setFogyoTermekek(sortedList(fTermekek));
            localStorage.setItem("fogyotermekek", JSON.stringify(sortedList(fogyoTermekek)));
        }
    }, [termekek]);

    const sortedList = (list: FItem[]) => {
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