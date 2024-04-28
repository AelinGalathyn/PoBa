"use client"

import {fetch_username, fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");

        fetch_username().then(response => {
            if (response === false) {
                router.push("/login")
            }
            if (webshopId === 0) {
                fetch_webshopok().then(data => {
                    localStorage.setItem("webshopId", JSON.stringify(data[0].webshopid));
                    router.push("/homePage");
                })
            }
            if (path === "/") {
                router.push("/homePage")
            }
        }).catch(e => alert("A kapcsolat a szerverrel nem tudott létrejönni."))

    }, []);
}