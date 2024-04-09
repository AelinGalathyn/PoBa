import {Switch} from "@nextui-org/switch";
import {sortedListOrders, weeklyIncome, weeklyStatistics} from "@/app/(Functions)/list_filtering";
import {Orders} from "@/app/(DTOs)/Rendelesek/Rendeles";
import {renderChart} from "@/app/(Functions)/charts";
import {Spacer} from "@nextui-org/react";
import {fetch_rendelesek} from "@/app/(ApiCalls)/fetch";
import {useEffect, useState} from "react";


export default function HomepageStatisztika() {
    const [rendelesek, setRendelesek] = useState<Orders[]>([])

    useEffect(() => {
        const webshopId = JSON.parse(localStorage.getItem("webshopId") ?? "0");
        const getRendelsesek = async () => {
            const rendelesek : Orders[] = await fetch_rendelesek(webshopId);
            setRendelesek(sortedListOrders(rendelesek));
        }

        getRendelsesek();
    }, []);

    let charts = [ "linear", "linear"];

    const changeCharts = (index : number, changeTo : string) => {
        if (changeTo !== "linear" && changeTo !== charts[index]) {
            charts[index] = changeTo;
        } else {
            charts[index] = "linear";
        }
    }

    return (
        <div className="fixed h-fit w-fit pe-[3vw]">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Statisztika</h1>
            </div>
            <div className="h-full w-full mt-5 pe-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div className="grid grid-cols-2">
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {renderChart(charts[0], "Heti rendelések", "db", weeklyStatistics(rendelesek), "chart1")}
                        <Spacer/>
                        <Switch onValueChange={() => changeCharts(0, "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {renderChart(charts[1], "Heti bevétel", "Ezer Ft", weeklyIncome(rendelesek), "chart2")}
                        <Spacer/>
                        <Switch onValueChange={() => changeCharts(1, "circle")} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}