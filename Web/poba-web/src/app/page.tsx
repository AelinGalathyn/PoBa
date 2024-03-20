"use client";
import Login from "@/app/login_page";
import Reg from "@/app/reg_page";
import HomePage from "@/app/home_page";
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
