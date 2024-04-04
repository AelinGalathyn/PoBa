import Image from "next/image";

export default function Beallitasok() {

    return (
        <div className="h-[95vh] w-full mt-5 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
            <div>
                <Image src="/nav_profil.png" width={50} height={50} alt="profil_icon"/>
            </div>
            <div>

            </div>
        </div>
    )
}