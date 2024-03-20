import { useEffect } from "react";
import Chart from "chart.js/auto";

interface LineChartWeekProps {
    title: string;
    label: string;
    isChart1: boolean;
}

export default function LineChartWeek({ title, label, isChart1 }: LineChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(isChart1 ? "myChart" : "myChart2") as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [{
                    data: [10, 35, 24, 55, 100, 25, 88],
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
