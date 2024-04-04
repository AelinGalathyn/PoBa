import {Switch} from "@nextui-org/switch";
import {useEffect, useState} from "react";
import {Spacer} from "@nextui-org/react";
import CircleChartWeek from "@/app/charts/circle_chart";
import LinearChartWeek from "@/app/charts/linear_chart";
import {weeklyStatistics} from "@/app/Functions/list_filtering";
import {Item} from "@/DTOs/Termekek/Termek";

export default function Statisztika() {
    const datumosTermekek : Item[] = JSON.parse(localStorage.getItem("datumosTermekek")!);

    const [isLinear, setIsLinear] = useState<boolean>(false);
    const [isLinear2, setIsLinear2] = useState<boolean>(false);

    return (
        <div className="fixed h-fit w-fit pe-[3vw]">
            <div className="text-center">
                <h1 className="text-2xl font-bold drop-shadow-md">Statisztika</h1>
            </div>
            <div className="h-full w-full mt-5 pe-2 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
                <div className="grid grid-cols-2">
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {!isLinear ?
                            <LinearChartWeek title="Heti rendelések" label="db" isChart1={true} data={weeklyStatistics(datumosTermekek)}/>
                            :
                            <CircleChartWeek title="Heti rendelések" label="db" isChart1={true} data={weeklyStatistics(datumosTermekek)}/>
                        }
                        <Spacer/>
                        <Switch onValueChange={setIsLinear} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                    <div className="h-full text-center flex flex-col justify-center items-center">
                        {!isLinear2 ?
                            <LinearChartWeek title="Heti bevétel" label="Ezer Ft" isChart1={false} data={weeklyStatistics(datumosTermekek)}/>
                            :
                            <CircleChartWeek title="Heti bevétel" label="Ezer Ft" isChart1={false} data={weeklyStatistics(datumosTermekek)}/>
                        }
                        <Spacer/>
                        <Switch onValueChange={setIsLinear2} size="lg" color="warning" className="py-[5px]">Circle</Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}