"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import User from "@/Users/User";
import {useGlobal} from "@/app/webshop/webshopId";

export default function Login() {

    const [felNev, setFelNev] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { webshopId, updateWebshopId } = useGlobal();
    const { loggedIn, updateLoggedIn } = useGlobal();

    const loginUser : User = new User(felNev, password)

    const login = () => {
        fetch("http://localhost:3000/auth/login", {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(loginUser)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                updateLoggedIn(true);
                return response.json();
            })
            .then(data => {
                updateWebshopId(data);
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    };

    return (
        <main className="flex mainContainer bg-amber-50 min-h-screen flex-col items-center pt-[10vh]">
            <div className="flex flex-col items-center">
                <Image
                    src="/poba_logo.png"
                    width={150}
                    height={150}
                    alt="PoBa logo"
                />
                <h1 className="text-5xl">Bejelentkezés</h1>
            </div>
            <div className="input-group flex flex-col items-center space-y-5 pt-20 pb-10">
                <div className="flex flex-col">
                    <label className="italic ps-5 pb-1">Felhasználónév</label>
                    <input type="text" id="nev_input" onChange={(e) => setFelNev(e.target.value)}/>

                </div>
                <div className="flex flex-col">
                    <label className="italic ps-5 pb-1">Jelszó</label>
                    <input type="text" id="jelszo_input" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded-lg active:border-0 active:mt-1"
                onClick={login}>
                    Ok
                </button>
            </div>
        </main>
    );
}