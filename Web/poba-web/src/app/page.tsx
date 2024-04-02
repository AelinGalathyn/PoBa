"use client";
import Login from "@/app/custom_pages/login_page";
import HomePage from "@/app/custom_pages/home_page";
import { GlobalProvider, useGlobal } from "@/app/Globals/global_values";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    return (
        <GlobalProvider>
            <HomeContent />
        </GlobalProvider>
    );
}

function HomeContent() {
    const [returnPage, setReturnPage] = useState<JSX.Element>(<></>);

    useEffect(() => {
        const isTokenAsync = async () => {
            try {
                const localStorageWebshopId = localStorage.getItem("webshopId");
                if (!localStorageWebshopId) {
                    return <Login />;
                }

                const response = await axios.get('http://localhost:3000', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.isValid === false) {
                    return <Login />;
                } else {
                    localStorage.setItem("userName", response.data.username);
                    localStorage.setItem("webshopId", JSON.stringify(response.data.webshopid));
                    return <HomePage />;
                }
            } catch (error) {
                console.error("Error az adatok betöltésekor", error);
                return <Login />;
            }
        }

        isTokenAsync().then((data) => setReturnPage(data));

    }, []);

    return returnPage;
}
