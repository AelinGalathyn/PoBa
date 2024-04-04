"use client";

import {Listbox, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import JelenlegiRendelesek from "@/app/custom_pages/jelenlegi_rendelesek_page";
import KifogyoTermekek from "@/app/custom_pages/jelenleg_kifogyo_page";
import HomepageStatisztika from "@/app/custom_pages/homepage_statisztika_page";
import Termekek from "@/app/custom_pages/termekek_page";
import FWebshop from "@/DTOs/Webshopok/FetchWebshop";
import FetchWebshopok from "@/app/Fetching/fetch_webshopok";
import Beallitasok from "@/app/custom_pages/beallitasok_page";
import Rendelesek from "@/app/custom_pages/rendelesek_page";
import Login from "@/app/custom_pages/login_page";
import {menuItems} from "@/app/FixData/lists";
import FetchTermekek from "@/app/Fetching/fetch_termekek";
import FetchRendelesek from "@/app/Fetching/fetch_rendelesek";
import Statisztika from "@/app/custom_pages/statisztika_page";
import {logOut} from "@/app/BackendConnections/reg_login_apicalls";

export default function HomePage() {
    const userName : string = localStorage.getItem("userName")!;
    const webshopId : number = JSON.parse(localStorage.getItem("webshopId")!);
    const webshopok : FWebshop[] = JSON.parse(localStorage.getItem("webshopok")!);

    const [activeSection, setActiveSection] = useState("Home");
    const [selectedWebshop, setSelectedWebshop] = useState<FWebshop>({webshopid : 0, name : ""});

    useEffect(() => {

        if (webshopId !== null) {
            FetchTermekek(webshopId);
            FetchRendelesek(webshopId);
            FetchWebshopok();
            setSelectedWebshop(webshopok[0]);
        }
    }, [webshopId]);

    return (
        <>
            {activeSection === "HomePage" ? (
                <Login />
            ) : (
                <main className="grid grid-cols-12">
                    <section
                        className="menu-style col-span-1 rounded-xl h-[100vh] w-[10vw] shadow-md shadow-gray-500 grid grid-rows-12">
                        <div className="row-span-3 bg-[#C6D8A7]" style={{borderTopRightRadius: 10}}>
                            <div className="flex justify-center pb-[2vh] items-center pt-[1vh]">
                                <Image
                                    src="/poba_logo.png"
                                    width={80}
                                    height={80}
                                    alt="Home_poba_logo"
                                    className="drop-shadow-lg cursor-pointer"
                                    onClick={() => setActiveSection("Home")}
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
                                <Listbox value={selectedWebshop} onChange={(value) => {
                                    setSelectedWebshop(value)
                                    localStorage.setItem("webshopId", value.webshopid.toString())
                                }}>
                                    <div className="flex flex-col px-2 justify-center mt-1">
                                        <Listbox.Button
                                            className="relative text-left text-[15px] py-1 pe-10 ps-2 text-[#60624d] button-style">

                                            <span>{selectedWebshop?.name}</span>
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
                                                {webshopok && webshopok.map((webshop) => (
                                                    <Listbox.Option key={webshop.webshopid} className={({active}) =>
                                                        `relative cursor-pointer select-none py-2 pl-10 pr-2 text-[#60624d] ${
                                                            active ? 'bg-white rounded-lg' : ''
                                                        }`
                                                    }
                                                                    value={webshop}
                                                    >
                                                        {({selected}) => (
                                                            <>
                                                                <span className={`block truncate ${ selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {webshop.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                        <div className="row-span-7 text-[15px] bg-[#C6D8A7]">
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <hr className="border-dotted border-t-8 w-full border-yellow-50 absolute top-[-4.5px]"/>
                                <ul className="w-3/4">
                                    {menuItems.map((item) => (
                                        <li key={Math.random() * 0.1}
                                            className="cursor-pointer font-bold bg-[#A3B389] hover:bg-white text-white hover:text-stone-500 rounded-md drop-shadow-md py-1 px-2 my-2"
                                            onClick={() => setActiveSection(item)}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative row-span-2 bg-[#C6D8A7]" style={{borderBottomRightRadius: 10}}>
                            <hr className="absolute top-[-2.5px] border-dotted border-t-8 w-full border-yellow-50"/>
                            <div className="flex justify-center items-center h-full">
                                <button
                                    className="text-[#FF442B] font-bold hover:bg-[#A3B389] hover:text-white p-2 rounded-md drop-shadow-md"
                                    onClick={() => logOut().then(data => setActiveSection(data))}>
                                    Kijelentkezés
                                </button>
                            </div>
                        </div>
                    </section>

                    {activeSection === "Rendelések" ? (
                        <section className="col-start-3 ps-10">
                            <Rendelesek/>
                        </section>
                    ) : activeSection === "Termékek" ? (
                        <section className="col-start-3 ps-10">
                            <Termekek/>
                        </section>
                    ) : activeSection === "Beállítások" ? (
                        <section className="col-start-3 col-span-9">
                            <Beallitasok/>
                        </section>
                    ) : activeSection === "Statisztika" ? (
                        <section className="col-start-3 col-span-9">
                            <Statisztika/>
                        </section>
                    ) : activeSection === "Home" ? (
                        <>
                            <section className="col-start-3 col-end-5">
                                <JelenlegiRendelesek/>
                            </section>

                            <section className="grid grid-rows-2 ps-[18vw]">
                                <div className="row-span-1">
                                    <KifogyoTermekek/>
                                </div>
                                <div className="row-span-1">
                                    <HomepageStatisztika/>
                                </div>
                            </section>
                        </>
                    ) : ("")}
                </main>
            )}
        </>
    );
}