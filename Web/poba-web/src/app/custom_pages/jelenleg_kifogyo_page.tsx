import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {useState} from "react";

export default function KifogyoTermekek() {

    const [termekek, setTermekek] = useState([
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 0
        },
        {
            id : Math.random() * 0.1,
            nev : "Körte",
            darab : 0
        },
        {
            id : Math.random() * 0.1,
            nev : "Almás pite",
            darab : 5
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 4
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 8
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 0
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 15
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 0
        },
        {
            id : Math.random() * 0.1,
            nev : "Alma",
            darab : 0
        },
    ])

    return (
        <div className="fixed h-2/6 w-2/5 mt-[5vh]">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Kifogyóban lévő termékek</h1>
            </div>
            <div className="h-full w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {termekek.map((termek) => (
                        <li key={termek.id}>
                            <Card className="bg-white m-2 rounded-md p-1 shadow-lg shadow-gray-400 ">
                                <CardHeader className="grid grid-cols-3 text-xl card-class">
                                    <p className="col-span-1 ps-3">{termek.nev}</p>
                                    <p className="col-span-1 text-center">{termek.darab}</p>
                                    <div className="col-span-1 justify-self-end">
                                        {termek.darab === 0 ? (
                                            <Image src="/elfogyott_icon.png" width={30} height={30} alt="szallito_ceg_icon" />
                                        ) : termek.darab > 0 && termek.darab <= 10 ? (
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