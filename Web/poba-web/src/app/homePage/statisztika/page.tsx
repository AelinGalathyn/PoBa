"use client";

import { weeklyIncome, weeklyStatistics } from "@/app/(Functions)/list_filtering";
import { Spacer } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { Orders } from "@/app/(DTOs)/Rendelesek/Rendeles";
import { fetch_rendelesek } from "@/app/(ApiCalls)/fetch";
import { renderChart } from "@/app/(Functions)/charts";
import {useEffect, useState} from "react";
import {webshopId} from "@/app/(FixData)/variables";

export default function Statisztika() {

    const [rendelesek, setRendelesek] = useState<Orders[]>([])

    useEffect(() => {
        const getRendelsesek = async () => {
            const rendelesek : Orders[] = await fetch_rendelesek(webshopId);
            setRendelesek(rendelesek);
        }

        getRendelsesek();
    }, []);

    let charts = [ "linear", "linear", "linear"];

    const changeCharts = (index : number, changeTo : string) => {
        if (changeTo !== "linear" && changeTo !== charts[index]) {
            charts[index] = changeTo;
        } else {
            charts[index] = "linear";
        }
    }

    return (
        <div className="h-[95vh] w-full mt-5 grid grid-cols-3 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
            <div className="text-center">
                {renderChart(charts[0], "Heti rendelések", "db", weeklyStatistics(rendelesek), "chart1")}
                <Spacer/>
                <Switch onValueChange={() => changeCharts(0, "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
            <div className="text-center">
                {renderChart(charts[1], "Heti bevétel", "Ezer Ft", weeklyIncome(rendelesek), "chart2")}
                <Spacer/>
                <Switch onValueChange={() => changeCharts(1, "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
            <div className="text-center">
                {renderChart(charts[2], "Heti bevétel", "Ezer Ft", weeklyIncome(rendelesek), "chart3")}
                <Spacer/>
                <Switch onValueChange={() => changeCharts(2, "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
        </div>
    );
}
