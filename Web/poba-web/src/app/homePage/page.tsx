"use client";

import JelenlegiRendelesek from "@/app/homePage/(HomeElements)/homepage_rendelesek_page";
import KifogyoTermekek from "@/app/homePage/(HomeElements)/homepage_termekek_page";
import HomepageStatisztika from "@/app/homePage/(HomeElements)/homepage_statisztika_page";
import React from "react";

export default function HomePage() {

    return <>
        <section className="col-span-1 row-span-1 md:col-span-4 md:col-start-4 lg:col-start-3 lg:col-span-3">
            <JelenlegiRendelesek/>
        </section>

        <section className="col-span-1 row-span-1 grid-rows-subgrid md:col-start-8 md:col-span-5 lg:col-start-7 lg:col-span-6">
            <div className="row-span-3">
                <KifogyoTermekek/>
            </div>
            <div className="row-span-3 mt-16">
                <HomepageStatisztika/>
            </div>
        </section>
    </>
}