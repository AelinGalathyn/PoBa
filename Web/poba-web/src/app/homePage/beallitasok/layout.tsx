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
                return () => {router.push("/homePage/beallitasok/webshopok")}
            case "Jelszó változtatás" :
                return () => {router.push("/homePage/beallitasok/changePassword")}
            case "Kijelentkezés" :
                return () => {logOut(); router.push("/login")}
            default :
                return () => {}
        }
    }

    return (
        <section className="md:col-start-4 md:col-span-8 lg:col-start-3 lg:col-span-9 overflow-auto scroll-smooth">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-1 h-fit md:h-[95vh] w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner">
                <div className="lg:col-span-2 md:col-span-3 p-3 md:p-0 md:border-l-2 md:border-b-gray-50 grid-rows-12">
                    <div className="flex row-span-2 mb-5 md:mb-0 justify-center items-center h-[55px] md:h-[15%]">
                        <img src="/nav_profil.png" width={50} height={50} alt="profil_icon"/>
                        <p>{username}</p>
                    </div>
                    <div className="h-[100px] md:h-3/4 row-span-3 flex flex-col lg:px-3 space-y-2 justify-center">
                        {beallitasMenuItems.map(item => CreateButton(item, buttonOnclick(item)))}
                    </div>
                </div>
                <div className="h-11/12 md:col-span-9 lg:col-span-10 row-span-7 bg-white m-2 rounded-md">
                    {children}
                </div>
            </div>
        </section>
    )
}