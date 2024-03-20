import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {useState} from "react";
import Image from "next/image";

export default function Rendelesek() {

    const [rendelesek, setRendelesek] = useState([
        {
            id : 287364,
            nev : "Eret Nek",
            datum : "2024.01.01",
            futar : "/foxpost_logo.png"
        },
        {
            id : 872634,
            nev : "Gipsz Elek",
            datum : "2024.02.01",
            futar : "/gls_logo.png"
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : ""
        },
        {
            id : 187412,
            nev : "Kulacs Pista",
            datum : "2024.04.01",
            futar : "/foxpost_logo.png"
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : ""
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : ""
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : "/gls_logo.png"
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : ""
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : ""
        },
        {
            id : 794652,
            nev : "Dézsa Bálint",
            datum : "2024.03.01",
            futar : "/gls_logo.png"
        },
    ])

    return (
        <div className="fixed w-fit h-3/4 mt-16">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
            </div>
            <div className="h-full w-[25vw] mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <ul>
                    {rendelesek.map((rendeles) => (
                        <li key={rendeles.id}>
                            <Card className="bg-white m-2 rounded-md text-xs shadow-lg shadow-gray-400">
                                <CardHeader className="card-class text-xl font-bold flex justify-between">
                                    {rendeles.id}
                                    {rendeles.futar != "" && <Image src={rendeles.futar} width={30} height={30} alt="szallito_ceg_icon" className=""/>}
                                </CardHeader>
                                <CardBody className="text-[15px] card-class">{rendeles.nev}</CardBody>
                                <CardFooter className="card-class">{rendeles.datum}</CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}