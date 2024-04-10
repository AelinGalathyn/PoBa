"use client"

import {fetch_username, fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        const getUsername = async () => {
            const response = await fetch_username();

            if (response === false) {
                router.push("/login")
            }
            if (webshopId === 0) {
                await fetch_webshopok().then(data => localStorage.setItem("webshopId", JSON.stringify(data[0].webshopid)))
                router.push("/homePage")
            }
            if (path === "/") {
                router.push("/homePage")
            }
        };

        getUsername();
    }, []);
}