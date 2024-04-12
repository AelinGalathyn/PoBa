"use client";

import {rendelesHeader} from "@/app/(FixData)/lists";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import { useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

export default function Rendelesek() {
    const [rendelesek, setRendelesek] = useState<Orders[]>([])

    const router = useRouter();

    useEffect(() => {
        const webshopId : number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_rendelesek(webshopId).then(data => setRendelesek(data));
    }, []);

    if (rendelesek.length === 0) {
        return <div className="col-start-3 ps-10 w-[75vw] h-3/4 flex justify-center items-center">
            <p>Loading...</p>
        </div>
    }

    return (
        <section className="col-start-3 ps-10">
            <div className="fixed w-[75vw] max-h-3/4 mt-16">
                <div className="text-center">
                    <h1 className="text-2xl font-bold drop-shadow-md">Rendelések</h1>
                </div>
                <div className="max-h-full w-full mt-5 p-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                    <table className="w-full table-style">
                        <thead>
                        <tr>
                            {rendelesHeader.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {rendelesek.map((rendeles, index) => (
                            <tr key={index} onClick={() => {
                                router.push(`rendelesek/${rendeles.orderid}?index=${index + 1}`)
                            }} className="text-center">
                                <td>{index + 1}</td>
                                <td>{rendeles.orderid}</td>
                                <td>{rendeles.customer.c_name}</td>
                                <td>{rendeles.items.length}</td>
                                <td>{rendeles.payment}</td>
                                <td>{rendeles.gross + " Ft"}</td>
                                <td>{rendeles.status_id}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}