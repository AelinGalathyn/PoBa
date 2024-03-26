"use client";
import Login from "@/app/custom_pages/login_page";
import Reg from "@/app/custom_pages/reg_page";
import HomePage from "@/app/custom_pages/home_page";
import { GlobalProvider, useGlobal } from "@/app/Globals/global_values";
import axios from "axios";
import {useEffect, useState} from "react";
import {number} from "prop-types";
import FetchWebshopok from "@/app/Fetching/fetch_webshopok";

export default function Home() {
    return (
        <GlobalProvider>
            <HomeContent />
        </GlobalProvider>
    );
}

function HomeContent() {
    const {webshopId, updateWebshopId} = useGlobal();
    const {updateUserName} = useGlobal();
    const [returnPage, setReturnPage] = useState<JSX.Element>(<></>);

    useEffect(() => {
        const isTokenAsync = async () => {
            const response = await axios.get('http://localhost:3000', {
                withCredentials: true,
                headers : {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.isValid === false) {
                return <Login />;
            } else {
                updateWebshopId(response.data.webshopid)
                updateUserName(response.data.username);
                return <HomePage />;
            }
        }

        isTokenAsync().then((data) => setReturnPage(data));

    }, [webshopId]);

    return returnPage;
}
