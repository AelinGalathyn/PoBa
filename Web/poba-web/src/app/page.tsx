"use client"

import {fetch_username} from "@/app/(ApiCalls)/fetch";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {webshopid} from "@/app/(FixData)/variables";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch_username();
            console.log("response if előtt: " + response);

            if (response === false) {
                router.push("/login")
            } else {
                router.push("/homePage")
            }
        };

        getUsername();
    }, []);
}