import {fetch_username} from "@/app/(ApiCalls)/fetch";
import {redirect} from "next/navigation";

export default async function Home() {
    const response = await fetch_username();

    if (response.isValid === false) {
        console.log(response)
        redirect("/login")
    } else {
        redirect("/homePage")
    }
}