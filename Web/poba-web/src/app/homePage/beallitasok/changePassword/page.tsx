"use client";

import {useEffect, useState} from "react";
import FWebshop from "@/app/(DTOs)/Webshopok/FetchWebshop";
import {fetch_webshopok} from "@/app/(ApiCalls)/fetch";
import {AddWebshop} from "@/app/(ApiCalls)/modify";
import {useRouter} from "next/navigation";
import {TrashIcon} from "@heroicons/react/20/solid";
import {ChangePassword, logOut} from "@/app/(ApiCalls)/calls";

export default function PasswordBeallitasok() {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const router = useRouter();

    const handleOnclick = () => {
        let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$", "gm");
        if (oldPassword === newPassword) {
            setNewPassword('')
            setOldPassword('')
            alert("Az új jelszó nem lehet egy a régiek közül.")
            router.push("webshopok/changePassword");
        }
        else if (!regex.test(newPassword)) {
            alert("A jelszónak legalább 1 nagybetűt [A-Z], 1 számot [0-9] és egy speciális karaktert [#?!@$ %^&*-] tartalmaznia kell.")
        }
        else {
            ChangePassword(oldPassword, newPassword).then(() => logOut()).catch(e => {console.log(e);throw new Error(e)});
        }
    }

    return (
        <div>
            <div>
                <input type="text" onChange={(e) => setOldPassword(e.target.value)} />
                <input type="text" onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={handleOnclick}>Módosít</button>
            </div>
        </div>
    )

}