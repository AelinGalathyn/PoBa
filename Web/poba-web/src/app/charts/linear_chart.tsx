import { useEffect } from "react";
import Chart from "chart.js/auto";

interface LineChartWeekProps {
    title: string;
    label: string;
    isChart1: boolean;
    data: { [dayOfWeek: number]: number; };
}

export default function LineChartWeek({ title, label, isChart1, data }: LineChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(isChart1 ? "myChart" : "myChart2") as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    label: label,
                    borderColor: "#3cba9f",
                    backgroundColor: "#71d1bd",
                    fill: false,
                }]
            }
        });

        return () => {
            myChart.destroy();
        };
    }, [isChart1, label, title]);

    return (
        <div className="w-full h-fit px-3 pt-3">
            <div className="rounded-md w-full h-full shadow-inner bg-white m-1">
                <h1 className="text-xl text-center">{title}</h1>
                <canvas id={isChart1 ? "myChart" : "myChart2"}></canvas>
            </div>
        </div>
    );
};
