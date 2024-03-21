"use client";
import {Listbox, Transition} from '@headlessui/react'
import React, {Fragment, useState} from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import User from "@/Users/User";
import Rendelesek from "@/app/custom_pages/rendelesek_page";
import KifogyoTermekek from "@/app/custom_pages/jelenleg_kifogyo_page";
import Statisztika from "@/app/custom_pages/statisztika_page";
import Termekek from "@/app/custom_pages/termekek_page";

export default function HomePage() {
    const [isTermekek, setIsTermekek] = useState<boolean>(false);

    const user : User = new User("admin", "admin");
    const [webshop_list, setWebshop_list] = useState([
        {
            key: "webshop1",
            label: "Webshop 1"
        },
        {
            key: "webshop2",
            label: "Webshop 2"
        },
        {
            key: "webshop3",
            label: "Webshop 3"
        },
        {
            key: "webshop4",
            label: "Webshop 4"
        }
    ]);

    const [menu_items, setMenu_items] = useState([
        {
            onclick : () => {},
            label: "Rendelések"
        },
        {
            onclick : () => setIsTermekek(true),
            label: "Termékek"
        },
        {
            onclick: () => {},
            label: "Statisztika"
        },
        {
            onclick : () => {},
            label: "Futár nyugták"
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
            <section className="col-start-1 col-span-2 bg-[#C6D8A7] min-h-screen w-fit p-10 rounded-lg shadow-md shadow-gray-500">
                <div>
                    <Image
                        src="/nav_profil.png"
                        width={50}
                        height={50}
                        alt="Profil_beallitasok_gomb"
                    />
                    <p className="text-white font-bold pt-2 pb-5 ps-1">{user.username}</p>
                </div>
                <div>
                    <Listbox value={selectedWebshop} onChange={setSelectedWebshop}>
                        <div className="mt-1">
                            <Listbox.Button className="relative text-left text-[15px] mt-3 rounded-md bg-white py-1 pe-10 ps-2 text-[#60624d]" style={{boxShadow: "rgba(0, 0, 0, 0.27) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 2px" }}>
                                <span>{selectedWebshop.label}</span>
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
                                <Listbox.Options
                                    className="mt-1 max-h-60 w-full overflow-auto text-xs button-style">
                                    {webshop_list.map((webshop) => (
                                        <Listbox.Option
                                            key={webshop.key}
                                            className={({active}) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-2 text-[#60624d] ${
                                                    active ? 'bg-white' : ''
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
                                                        {webshop.label}
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
                <div className="mt-10 text-[15px]">
                    <ul>
                        {menu_items.map((item) => (
                            <li key={Math.random() * 0.1} className="cursor-pointer button-style py-1 px-2 my-2" onClick={item.onclick}>{item.label}</li>
                        ))}
                    </ul>
                </div>
                <div className="fixed bottom-10 left-0">
                    <hr className="border-dotted border-t-8 w-48 border-white ms-2"/>
                    <button
                        className="text-[#FF442B] font-bold mt-5 hover:bg-[#A3B389] hover:text-white p-2 rounded-md ms-8 drop-shadow-md">Kijelentkezés
                    </button>
                </div>
            </section>

            { isTermekek ? (
                <section>
                    <Termekek />
                </section>
            ) : ("")}

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
        </main>
    );
}