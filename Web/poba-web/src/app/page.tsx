"use client"

import {fetch_username, fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {webshopId} from "@/app/(FixData)/variables";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch_username();
            console.log("response if előtt: " + response);
            console.log("response if előtt: " + webshopId);

            if (response === false) {
                router.push("/login")
            } else if (webshopId === 0) {
                await fetch_webshopok().then(data => localStorage.setItem("webshopId", JSON.stringify(data[0].webshopid)))
                console.log(webshopId)
                router.push("/homePage")
            }
        };

        getUsername();
    }, []);
}