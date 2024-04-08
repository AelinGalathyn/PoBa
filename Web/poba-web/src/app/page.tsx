import {fetch_username} from "@/app/(ApiCalls)/fetch";
import {redirect} from "next/navigation";
import {webshopid} from "@/app/(FixData)/variables";

export default async function Home() {
    const response = await fetch_username();

    if (response.data === false || webshopid.webshopid === 0) {
        redirect("/login")
    } else {
        redirect("/homePage")
    }
}