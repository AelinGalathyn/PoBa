"use client";

import {itemsFunctions, itemsHeader} from "@/app/(FixData)/lists";
import {CreateButton} from "@/app/(Functions)/create_html_elements";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import {redirect, usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

export default function Termekek({children} : { children : React.ReactNode }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [showCorrectList, setShowCorrectList] = useState<string>("");

    const handleSearch = (kifejezes : string, showCorrectList : string) => {
        const params = new URLSearchParams(searchParams);
        if (kifejezes) {
            params.set('query', kifejezes);
            params.set('correctList', showCorrectList);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <section className="col-start-3 ps-10">
            <div className="fixed w-[75vw] h-3/4 mt-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold drop-shadow-md">Termékek</h1>
                </div>
                <div className="mt-3 grid grid-cols-2">
                    <div className="space-x-2">
                        {itemsFunctions.map(item => CreateButton(item, () => setShowCorrectList(item)))}
                    </div>
                    <div className="flex justify-end items-center grid-cols-2">
                        <MagnifyingGlassIcon width={25} height={25}/>
                        <input className="ms-2 p-2 border-2 border-gray-300 rounded-md" type="text"
                               onClick={() => setShowCorrectList("Keresőmező")}
                               onChange={(e) => handleSearch(e.target.value, showCorrectList)}
                               defaultValue={searchParams.get('query')?.toString()}
                        />
                    </div>
                </div>
                <div
                    className="max-h-full w-full mt-5 p-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                    <table className="w-full table-style">
                        <thead>
                        <tr>
                            {itemsHeader.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}