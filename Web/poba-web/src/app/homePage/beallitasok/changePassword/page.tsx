"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {ChangePassword, logOut} from "@/app/(ApiCalls)/calls";
import {ConflictException} from "@nestjs/common";

export default function PasswordBeallitasok() {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const router = useRouter();

    const handleOnclick = () => {
        let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$", "gm");
        if (oldPassword === newPassword) {
            alert("Az új jelszó nem lehet ugyan az, mint az aktuális.")
        }
        else if (!regex.test(newPassword)) {
            alert("A jelszónak legalább 1 nagybetűt [A-Z], 1 számot [0-9] és egy speciális karaktert [#?!@$ %^&*-] tartalmaznia kell.")
        }
        else if (oldPassword === "" || newPassword === "") {
            alert("A mezők kitöltése kötelező.")
        }
        else {
            ChangePassword(oldPassword, newPassword).then(() => {logOut(); router.push("/login");}).catch(e => alert("A jelszó változtatása nem sikerült. " + e.code));
        }
    }

    return (
        <div className="p-24">
            <div className="space-y-2 flex flex-col items-center">
                <h1 className="text-3xl mb-[5vh] text-center">Jelszó változtatás</h1>
                <input placeholder="Jelenlegi jelszó" className="w-2/3 p-2 border-2 border-gray-400 rounded-md" type="password" onChange={(e) => setOldPassword(e.target.value)} />
                <input placeholder="Új jelszó" className="w-2/3 p-2 border-2 border-gray-400 rounded-md" type="password" onChange={(e) => setNewPassword(e.target.value)} />
                <button className="p-2 bg-[#A28B93] text-white rounded-md hover:bg-gray-200 hover:text-[#60624d] font-bold" onClick={handleOnclick}>Módosít</button>
            </div>
        </div>
    )

}