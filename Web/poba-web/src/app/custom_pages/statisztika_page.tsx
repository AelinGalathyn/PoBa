import LinearChartWeek from "@/app/charts/linear_chart";
import {weeklyIncome, weeklyStatistics} from "@/app/Functions/list_filtering";
import CircleChartWeek from "@/app/charts/circle_chart";
import {Spacer} from "@nextui-org/react";
import {Switch} from "@nextui-org/switch";
import {Orders} from "@/DTOs/Rendelesek/Rendeles";
import {useState} from "react";

export default function Statisztika() {
    const rendelesek : Orders[] = JSON.parse(localStorage.getItem("rendelesek")!);

    const [isLinear, setIsLinear] = useState<boolean>(false);
    const [isLinear2, setIsLinear2] = useState<boolean>(false);
    const [isLinear3, setIsLinear3] = useState<boolean>(false);

    return (
        <div
            className="h-[95vh] w-full mt-5 grid grid-cols-3 bg-gray-200 rounded-lg shadow-gray-400 shadow-inner overflow-hidden hover:overflow-auto scroll-smooth">
            <div className="text-center">
                {!isLinear ?
                    <LinearChartWeek title="Heti rendelések" label="db" isChart={true}
                                     data={weeklyStatistics(rendelesek)} canvasId="chart1"/>
                    :
                    <CircleChartWeek title="Heti rendelések" label="db" isChart={true}
                                     data={weeklyStatistics(rendelesek)} canvasId="chart1"/>
                }
                <Spacer/>
                <Switch onValueChange={setIsLinear} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
            <div className="text-center">
                {!isLinear2 ?
                    <LinearChartWeek title="Heti bevétel" label="Ezer Ft" isChart={false}
                                     data={weeklyIncome(rendelesek)} canvasId="chart2"/>
                    :
                    <CircleChartWeek title="Heti bevétel" label="Ezer Ft" isChart={false}
                                     data={weeklyIncome(rendelesek)} canvasId="chart2"/>
                }
                <Spacer/>
                <Switch onValueChange={setIsLinear2} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
            <div className="text-center">
                {!isLinear3 ?
                    <LinearChartWeek title="Heti bevétel" label="Ezer Ft" isChart={false}
                                     data={weeklyIncome(rendelesek)} canvasId="chart3"/>
                    :
                    <CircleChartWeek title="Heti bevétel" label="Ezer Ft" isChart={false}
                                     data={weeklyIncome(rendelesek)} canvasId="chart3"/>
                }
                <Spacer/>
                <Switch onValueChange={setIsLinear3} size="lg" color="warning" className="py-[5px]">Circle</Switch>
            </div>
        </div>
    )
}