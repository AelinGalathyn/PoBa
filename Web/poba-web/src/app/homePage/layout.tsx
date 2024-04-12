"use client";

import Image from "next/image";
import React, {Fragment, useEffect, useState} from "react";
import {menuItems} from "@/app/(FixData)/lists";
import {logOut} from "@/app/(ApiCalls)/calls";
import {useRouter} from "next/navigation";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {fetch_username, fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import Home from "@/app/page";

export default function HomePageLayout({children} : { children : React.ReactNode }) {

    Home();

    const [webshopok, setWebshopok] = useState<FWebshop[]>([]);
    const [selectedWebshop, setSelectedWebshop] = useState<FWebshop>({} as FWebshop)
    const [username, setUsername] = useState("");

    const router = useRouter();

    useEffect(() => {
        const webshopId: number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        console.log(webshopId)
        fetch_username().then(userData => {
            if (typeof userData === "string") {
                setUsername(userData);
            }
        });
        fetch_webshopok().then(webshopok => {
            setWebshopok(webshopok);
            setSelectedWebshop(webshopok.find(item => item.webshopid === webshopId) ?? webshopok[0]);
        });
    }, []);

    if (webshopok.length === 0) {
        return <p className="h-[100vh] w-[100vw] flex justify-center items-center">Loading...</p>
    }

    return (
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
                            onClick={() => router.push("/homePage")}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <Image
                            src="/nav_profil.png"
                            width={50}
                            height={50}
                            alt="Profil_beallitasok_gomb"
                        />
                        <p className="text-white font-bold ps-1 drop-shadow-lg">{username}</p>
                    </div>
                </div>
                <div className="row-span-1 bg-[#C6D8A7]">
                    <Listbox value={selectedWebshop} onChange={(value) => {
                        setSelectedWebshop(value);
                        localStorage.setItem("webshopId", JSON.stringify(value.webshopid));
                        router.refresh();
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
                                        value={webshop}>
                                            {({selected}) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
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
                <div className="row-span-7 text-[15px] bg-[#C6D8A7]">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <hr className="border-dotted border-t-8 w-full border-yellow-50 absolute top-[-4.5px]"/>
                        <ul className="w-3/4">
                            {menuItems.map((item) => (
                                <li key={Math.random() * 0.1}
                                    className="cursor-pointer font-bold bg-[#A3B389] hover:bg-white text-white hover:text-stone-500 rounded-md drop-shadow-md py-1 px-2 my-2"
                                    onClick={() => router.push(`/homePage/${item.destination}`)}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative row-span-2 bg-[#C6D8A7]" style={{borderBottomRightRadius: 10}}>
                    <hr className="absolute top-[-2.5px] border-dotted border-t-8 w-full border-yellow-50"/>
                    <div className="flex justify-center items-center h-full">
                        <button
                            className="text-[#FF442B] font-bold hover:bg-[#A3B389] hover:text-white p-2 rounded-md drop-shadow-md"
                            onClick={() => {logOut().then(() => (router.push("/login")))}}>
                            Kijelentkezés
                        </button>
                    </div>
                </div>
            </section>
            {children}
        </main>
    )
}