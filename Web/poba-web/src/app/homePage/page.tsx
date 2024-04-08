import JelenlegiRendelesek from "@/app/homePage/(HomeElements)/homepage_rendelesek_page";
import KifogyoTermekek from "@/app/homePage/(HomeElements)/homepage_termekek_page";
import HomepageStatisztika from "@/app/homePage/(HomeElements)/homepage_statisztika_page";
import React from "react";

export default function HomePage() {

    return <>
        <section className="col-start-3 col-end-5">
            <JelenlegiRendelesek/>
        </section>

        <section className="grid grid-rows-2 ps-[18vw]">
            <div className="row-span-1">
                <KifogyoTermekek/>
            </div>
            <div className="row-span-1">
                <HomepageStatisztika/>
            </div>
        </section>
    </>
}