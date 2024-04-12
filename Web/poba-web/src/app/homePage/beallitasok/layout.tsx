"use client";

import {fetch_username} from "@/app/(ApiCalls)/fetch";
import React, {useEffect, useState} from "react";
import {CreateButton} from "@/app/(Functions)/create_html_elements";
import {beallitasMenuItems} from "@/app/(FixData)/lists";
import {useRouter} from "next/navigation";
import {logOut} from "@/app/(ApiCalls)/calls";

export default function BeallitasokLayout({children} : { children : React.ReactNode }) {
    const [username, setUsername] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        fetch_username().then(data => {
            if (typeof data === "string") {
                setUsername(data);
            }
        }).catch(e => {throw new Error(e)})
    }, []);

    const buttonOnclick = (buttonName : string) => {
        switch (buttonName) {
            case "Csatolt webshopok" :
                return () => {router.push("beallitasok/webshopok")}
            case "Jelszó változtatás" :
                return () => {router.push("ballitasok/changePassword")}
            case "Kijelentkezés" :
                return () => {logOut(); router.push("beallitasok/login")}
            default :
                return () => {}
        }
    }

    return (
        <section className="col-start-3 col-span-9">
            <div className="grid grid-cols-12 h-[95vh] w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div className="col-span-2 border-l-2 border-b-gray-50">
                    <div className="flex justify-center items-center h-[15%]">
                        <img src="/nav_profil.png" width={50} height={50} alt="profil_icon"/>
                        <p>{username}</p>
                    </div>
                    <div className="h-[75%] flex flex-col px-3 space-y-2 justify-center">
                    {beallitasMenuItems.map(item => CreateButton(item, buttonOnclick(item)))}
                    </div>
                </div>
                <div className="col-span-10 bg-white m-2 rounded-md">
                    {children}
                </div>
            </div>
        </section>
    )
}