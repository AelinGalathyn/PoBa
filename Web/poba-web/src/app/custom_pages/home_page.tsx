"use client";
import {Listbox, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import User from "@/DTOs/Users/User";
import Rendelesek from "@/app/custom_pages/rendelesek_page";
import KifogyoTermekek from "@/app/custom_pages/jelenleg_kifogyo_page";
import Statisztika from "@/app/custom_pages/statisztika_page";
import Termekek from "@/app/custom_pages/termekek_page";
import Home from "@/app/page";
import {useGlobal} from "@/app/Globals/global_values";
import FWebshop from "@/DTOs/Webshopok/FetchWebshop";
import FetchWebshopok from "@/app/Fetching/fetch_webshopok";

export default function HomePage() {
    const [isTermekek, setIsTermekek] = useState<boolean>(false);
    const [isHome, setIsHome] = useState<boolean>(true);
    const { userName } = useGlobal();
    const { webshopok } = useGlobal();
    const { webshopId, updateWebshopId } = useGlobal();

    useEffect(() => {
        FetchWebshopok();
    }, [webshopId]);

    console.log(webshopok);

    const [webshop_list, setWebshop_list] = useState<FWebshop[]>(webshopok);

    const [menu_items, setMenu_items] = useState([
        {
            onclick : () => {},
            label: "Rendelések"
        },
        {
            onclick : () => {setIsTermekek(true); setIsHome(false);},
            label: "Termékek"
        },
        {
            onclick: () => {},
            label: "Statisztika"
        },
        {
            onclick : () => {},
            label: "Pénzügyek"
        },
        {
            onclick : () => {},
            label: "Beállítások"
        }
    ]);

    const [selectedWebshop, setSelectedWebshop] = useState(webshop_list[0]);

    return (
        <main className="grid grid-cols-12">
            <section className="menu-style col-span-1 rounded-xl h-[100vh] w-[10vw] shadow-md shadow-gray-500 grid grid-rows-12">
                <div className="row-span-3 bg-[#C6D8A7]" style={{borderTopRightRadius : 10}}>
                    <div className="flex justify-center pb-6 items-center">
                        <Image
                            src="/poba_logo.png"
                            width={80}
                            height={80}
                            alt="Home_poba_logo"
                            className="drop-shadow-lg cursor-pointer"
                            onClick={() => setIsHome(true)}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <Image
                            src="/nav_profil.png"
                            width={50}
                            height={50}
                            alt="Profil_beallitasok_gomb"
                        />
                        <p className="text-white font-bold ps-1 drop-shadow-lg">{userName}</p>
                    </div>
                    <div>
                        <Listbox value={selectedWebshop} onChange={(value) => {setSelectedWebshop(value); updateWebshopId(selectedWebshop.webshopid);}}>
                            <div className="flex flex-col px-2 justify-center mt-1">
                                <Listbox.Button className="relative text-left text-[15px] rounded-md bg-white py-1 pe-10 ps-2 text-[#60624d]"
                                    style={{boxShadow: "rgba(0, 0, 0, 0.27) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 2px"}}>
                                    <span>{selectedWebshop.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5"/>
                                </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="z-50 mt-2 max-h-60 w-full text-xs button-style">
                                        {webshop_list.map((webshop) => (
                                            <Listbox.Option
                                                key={webshop.webshopid}
                                                className={({active}) =>
                                                    `relative cursor-pointer select-none py-2 pl-10 pr-2 text-[#60624d] ${
                                                        active ? 'bg-white rounded-lg' : ''
                                                    }`
                                                }
                                                value={webshop}
                                            >
                                                {({selected}) => (
                                                    <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        }`}>
                                                        {webshop.name}
                                                    </span>
                                                        {selected ? (
                                                            <span
                                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-4 w-4" aria-hidden="true"/>
                                                        </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
                <div className="row-span-7 text-[15px] bg-yellow-50">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <hr className="border-dotted border-t-8 w-full border-yellow-50 absolute top-[-4.5px]"/>
                        <ul className="w-3/4">
                            {menu_items.map((item) => (
                                <li key={Math.random() * 0.1} className="cursor-pointer button-style py-1 px-2 my-2"
                                    onClick={item.onclick}>{item.label}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative row-span-2 bg-[#C6D8A7]" style={{borderBottomRightRadius: 10}}>
                    <hr className="absolute top-[-2.5px] border-dotted border-t-8 w-full border-yellow-50"/>
                    <div className="flex justify-center items-center h-full">
                        <button
                            className="text-[#FF442B] font-bold hover:bg-[#A3B389] hover:text-white p-2 rounded-md drop-shadow-md"
                            onClick={() => Home()}>
                            Kijelentkezés
                        </button>
                    </div>
                </div>
            </section>
            {isHome ? (
                <>
                    <section className="col-start-3 col-end-5">
                        <Rendelesek/>
                    </section>

                    <section className="grid grid-rows-2 ps-[18vw]">
                        <div className="row-span-1">
                            <KifogyoTermekek/>
                        </div>
                        <div className="row-span-1">
                            <Statisztika/>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    {isTermekek ? (
                        <section className="col-start-3 ps-10">
                            <Termekek/>
                        </section>
                    ) : ("")}
                </>
            )}
        </main>
    );
}