"use client";

import Image from "next/image";
import {useState} from "react";
import RegisterUser from "@/app/(DTOs)/Users/RegisterUser";
import {useRouter} from "next/navigation";
import {reg} from "@/app/(ApiCalls)/calls";
import {ConflictException} from "@nestjs/common";
import {apiRegex, regex} from "@/app/(FixData)/regex";

export default function Reg() {

    const [felNev, setFelNev] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [apikey, setApikey] = useState<string>("");

    const newUser : RegisterUser = new RegisterUser(felNev, password, apikey);
    const router = useRouter();

    const handleReg = () => {

        if (felNev === "" || password === "" || apikey === "") {
            alert("A mezők kitöltése kötelező.")
        }
        else if(!regex[Symbol.match](password)) {
            alert("A jelszónak legalább 1 nagybetűt [A-Z], 1 számot [0-9] és egy speciális karaktert [#?!@$ %^&*-] tartalmaznia kell.")
        }
        else if (!apiRegex[Symbol.match](apikey)) {
            alert("Az Api kulcs hibás formátumú.")
        }
        else {
            reg(newUser).then(() => router.push("/login")).catch(e => {e.response === undefined ? alert("A regisztráció hibába ütközött.") : e.response.status === 409 ? alert("Ilyen felhasználó már létezik.") : ""});
        }
    }

    return (
        <main className="flex mainContainer bg-amber-50 min-h-screen flex-col items-center pt-[10vh]">
            <div className="flex flex-col items-center">
                <Image
                    src="/poba_logo.png"
                    width={150}
                    height={150}
                    alt="PoBa logo"
                />
                <h1 className="text-5xl">Regisztráció</h1>
            </div>
            <div className="input-group flex flex-col items-center space-y-5 pt-20 pb-10">
                <div className="flex flex-col">
                    <label className="italic ps-5 pb-1">Felhasználónév</label>
                    <input type="text" id="nev_input" onChange={(e) => setFelNev(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label className="italic ps-5 pb-1">Jelszó</label>
                    <input type="password" id="jelszo_input" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label className="italic ps-5 pb-1">Api kulcs</label>
                    <input type="text" id="apikulcs_input" onChange={(e) => setApikey(e.target.value)}/>
                </div>
            </div>
            <div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded-lg active:border-0 active:mt-1"
                        onClick={() => handleReg()}>
                    Ok
                </button>
            </div>
            <div>
                <button className="hover:text-gray-500 py-2 px-4 active:border-0 active:mt-1"
                        onClick={() => router.push("/login")}>
                    Már van fiókom
                </button>
            </div>
        </main>
    );
}