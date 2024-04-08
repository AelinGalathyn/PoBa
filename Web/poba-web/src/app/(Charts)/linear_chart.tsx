"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

interface LineChartWeekProps {
    title: string;
    label: string;
    data: { [dayOfWeek: number]: number; };
    canvasId : string;
}

export default function LineChartWeek({ title, label, data, canvasId }: LineChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"],
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
    }, [label, title]);

    return (
        <div className="w-full h-fit px-3 pt-3">
            <div className="rounded-md w-full h-full shadow-inner bg-white m-1">
                <h1 className="text-xl text-center">{title}</h1>
                <canvas id={canvasId}></canvas>
            </div>
        </div>
    );
};
