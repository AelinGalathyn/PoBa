"use client";
import Login from "@/app/custom_pages/login_page";
import Reg from "@/app/custom_pages/reg_page";
import HomePage from "@/app/custom_pages/home_page";
import { GlobalProvider, useGlobal } from "@/app/webshop/webshopId";
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
    const {updateWebshopId} = useGlobal();
    const [returnPage, setReturnPage] = useState<JSX.Element>();

    useEffect(() => {
        const isTokenAsync = async () => {
            const response = await axios.get('http://localhost:3000', {
                withCredentials: true,
                headers : {
                    'Content-Type': 'application/json'
                }
            });

            try {
                updateWebshopId(response.data.webshopid);
                return <HomePage />;
            } catch {
                return <Login />;
            }
        }

        isTokenAsync().then((data) => setReturnPage(data));

    }, []);

    return returnPage;
}
