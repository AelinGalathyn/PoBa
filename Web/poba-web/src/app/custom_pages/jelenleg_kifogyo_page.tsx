import {Card, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useGlobal} from "@/app/webshop/webshopId";
import axios from "axios";
import Item from "@/app/Termekek/Termek";

export default function KifogyoTermekek() {
    const { webshopId } = useGlobal();
    const { termekek, updateTermekek } = useGlobal();

    const [fogyoTermekek, setFogyoTermekek] = useState<Item[]>([]);

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

    useEffect(() => {
        const fetchTermekek = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/item/all/`, {
                    withCredentials: true,
                    params: { webshopid: webshopId }
                });

                updateTermekek(response.data);
                console.log(webshopId);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTermekek();

    }, [webshopId]);

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
                                            <Image src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon" />
                                        ) : termek.qty > 0 ? (
                                            <Image src="/kifogyoban_icon.png" width={30} height={30} alt="szallito_ceg_icon" />
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