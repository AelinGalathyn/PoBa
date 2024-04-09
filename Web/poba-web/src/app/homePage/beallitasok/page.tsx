import {fetch_username} from "@/app/(ApiCalls)/fetch";

export default async function Beallitasok() {

    const username = await fetch_username();

    return (
        <section className="col-start-3 col-span-9">
            <div className="h-[95vh] w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div>
                    <img src="/nav_profil.png" width={50} height={50} alt="profil_icon"/>
                    <p>{username}</p>
                </div>
                <div>

                </div>
            </div>
        </section>
    )
}