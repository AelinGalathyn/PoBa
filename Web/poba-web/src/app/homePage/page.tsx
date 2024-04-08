"use client";

import JelenlegiRendelesek from "@/app/homePage/(HomeElements)/homepage_rendelesek_page";
import KifogyoTermekek from "@/app/homePage/(HomeElements)/homepage_termekek_page";
import HomepageStatisztika from "@/app/homePage/(HomeElements)/homepage_statisztika_page";
import React, {useEffect} from "react";
import Home from "@/app/page";

export default function HomePage() {

    Home();

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