"use client";
import Login from "@/app/custom_pages/login_page";
import Reg from "@/app/custom_pages/reg_page";
import HomePage from "@/app/custom_pages/home_page";
import { GlobalProvider, useGlobal } from "@/app/webshop/webshopId";

export default function Home() {
    return (
        <GlobalProvider>
            <HomeContent />
        </GlobalProvider>
    );
}

function HomeContent() {
    const { loggedIn } = useGlobal();

    return loggedIn ? <HomePage /> : <Login />;
}
