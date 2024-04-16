"use client";

import {weeklyFamousItems, weeklyIncome, weeklyStatistics} from "@/app/(Functions)/list_filtering";
import { Spacer } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { Orders } from "@/app/(DTOs)/Rendelesek/Rendeles";
import { fetch_rendelesek } from "@/app/(ApiCalls)/fetch";
import { renderChart } from "@/app/(Functions)/charts";
import React, {useEffect, useState} from "react";
import {statisztikaPage} from "@/app/(FixData)/lists";

export default function Statisztika() {
    const [rendelesek, setRendelesek] = useState<Orders[]>([]);
    const [charts, setCharts] = useState<string[]>([]);

    useEffect(() => {
        const webshopId: number = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_rendelesek(webshopId).then(rendelesek => {
            setRendelesek(rendelesek);
        });
        setCharts(statisztikaPage);
    }, []);

    const changeCharts = (chartId: string, changeTo: string) => {
        const fixCharts = statisztikaPage;
        const numberChartId = Number.parseInt(chartId);
        setCharts(prevCharts => ({
            ...prevCharts,
            [chartId]: prevCharts[numberChartId] === changeTo ? fixCharts[numberChartId] : changeTo
        }));
    };

    if (rendelesek.length === 0) {
        return <p className="h-[95vh] w-[90vw] flex justify-center items-center">Loading...</p>
    }

    return (
        <section className="col-start-3 col-span-9">
            <div
                className="h-[95vh] w-full mt-5 grid grid-cols-3 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div className="text-center">
                    {renderChart(charts[0], "Heti rendelések", "db", "", "", weeklyStatistics(rendelesek), {}, {}, "chart1")}
                    <Spacer/>
                    <Switch onValueChange={() => changeCharts("0", "circle")} size="lg" color="warning"
                            className="py-[5px]">Circle</Switch>
                </div>
                <div className="text-center">
                    {renderChart(charts[1], "Heti bevétel", "Ezer Ft", "", "", weeklyIncome(rendelesek), {}, {}, "chart2")}
                    <Spacer/>
                    <Switch onValueChange={() => changeCharts("1", "circle")} size="lg" color="warning"
                            className="py-[5px]">Circle</Switch>
                </div>
                <div className="text-center">
                    {renderChart(charts[2], "Heti népszerű termékek", "Eladott mennyiség", "", "", weeklyFamousItems(rendelesek), {}, {}, "chart3")}
                    <Spacer/>
                    <Switch onValueChange={() => changeCharts("2", "circle")} size="lg" color="warning"
                            className="py-[5px]">Circle</Switch>
                </div>
                <div className="text-center">
                    {renderChart(charts[3], "Heti rendelések és bevétel", "", "Rendelések db", "Bevétel Ezer Ft", {}, weeklyStatistics(rendelesek), weeklyIncome(rendelesek), "chart4")}
                    <Spacer/>
                    <Switch onValueChange={() => changeCharts("3", "linecat")} size="lg" color="warning"
                            className="py-[5px]">LineCat</Switch>
                </div>
            </div>
        </section>
    );
}
