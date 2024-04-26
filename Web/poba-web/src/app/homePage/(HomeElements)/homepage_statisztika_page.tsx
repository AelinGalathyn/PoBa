import {Switch} from "@nextui-org/switch";
import {sortedListOrders, weeklyIncome, weeklyStatistics} from "@/app/(Functions)/list_filtering";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {renderChart} from "@/app/(Functions)/charts";
import {Spacer} from "@nextui-org/react";
import {fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import React, {useEffect, useState} from "react";
import {homeStatisztikaPage} from "@/app/(FixData)/lists";


export default function HomepageStatisztika() {
    const [rendelesek, setRendelesek] = useState<Orders[]>([])
    const [charts, setCharts] = useState<string[]>([]);

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        fetch_rendelesek(webshopId).then(data => setRendelesek(sortedListOrders(data)));
        setCharts(homeStatisztikaPage);
    }, []);

    const changeCharts = (chartId: string, changeTo: string) => {
        const fixCharts = homeStatisztikaPage;
        const numberChartId = Number.parseInt(chartId);
        setCharts(prevCharts => ({
            ...prevCharts,
            [chartId]: prevCharts[numberChartId] === changeTo ? fixCharts[numberChartId] : changeTo
        }));
    };

    if (rendelesek === undefined || rendelesek.length === 0) {
        return <p className="h-full w-[45vw] flex justify-center items-center">Loading...</p>
    }

    return (
        <div className="h-full w-full pe-[3vw]">
            <div className="text-center">
                <h1 className="text-[25px] font-bold drop-shadow-md">Statisztika</h1>
            </div>
            <div className="h-full w-full mt-5 pe-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {renderChart(charts[0], "Heti rendelések", "db", "", "", weeklyStatistics(rendelesek), {}, {}, "chart1")}
                        <Spacer/>
                        <Switch onValueChange={() => changeCharts("0", "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {renderChart(charts[1], "Heti bevétel", "Ezer Ft", "", "", weeklyIncome(rendelesek), {}, {}, "chart2")}
                        <Spacer/>
                        <Switch onValueChange={() => changeCharts("1", "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}