import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";

export default function JelenlegiRendelesek() {
    const rendelesek : Orders[] = JSON.parse(localStorage.getItem("rendelesek")!);
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);

    const [frissRendelesek, setFrissRendelesek] = useState<Orders[]>([]);

    const sortedList = (list: Orders[]) => {
        const currentDate = new Date().getTime(); // Get current timestamp
        return list.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return Math.abs(currentDate - dateA) - Math.abs(currentDate - dateB);
        });
    }

    useEffect(() => {
        localStorage.setItem("rendelesek", JSON.stringify(sortedList(rendelesek)));
        setFrissRendelesek(rendelesek.filter(item => item).splice(0, 15));
    }, [webshopId]);

    return (
        <div className="fixed w-fit h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="h-full w-[25vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {frissRendelesek.map((rendeles) => (
                        <li key={rendeles.orderid}>
                            <Card className="bg-white m-2 rounded-md text-xs shadow-lg shadow-gray-400">
                                <CardHeader className="card-class text-xl font-bold flex justify-between">
                                    {rendeles.orderid}
                                    {rendeles.sender.toString().toLowerCase().includes("gls") ? (<Image src="/gls_logo.png" width={30} height={30} alt="szallito_ceg_icon"/>) :
                                        rendeles.sender.toString().toLowerCase().includes("foxpost") ? (<Image src="/foxpost_logo.png" width={30} height={30} alt="szallito_ceg_icon"/>) :
                                            rendeles.sender.toString().toLowerCase().includes("posta") ||  rendeles.sender.toString().toLowerCase().includes("mpl")?
                                                (<Image src="/magyar_icon.png" width={30} height={30} alt="szallito_ceg_icon"/>) : ("")}
                                </CardHeader>
                                <CardBody className="text-[15px] card-class">{rendeles.customer.c_name}</CardBody>
                                <CardFooter className="card-class">{rendeles.date.toString()}</CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}