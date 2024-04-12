"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

interface BarChartWeekProps {
    title: string;
    label: string;
    label1: string;
    label2: string;
    data1: Record<string, number>;
    data2: Record<string, number>;
    canvasId : string;
}

export default function StackedLineCatChartWeek({ title, label, label1, label2, data1, data2, canvasId }: BarChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data1),
                datasets: [
                    {
                        label: label1,
                        data: Object.values(data1),
                        borderColor: "#F4B499",
                        backgroundColor: "rgba(244, 180, 153, 0.50)",
                    },
                    {
                        label: label2,
                        data: Object.values(data2),
                        borderColor: "#3cba9f",
                        backgroundColor: "#71d1bd",
                        stepped: true,
                        yAxisID: 'y2',
                    }
                ]},
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                layout: {
                    padding: 10
                }
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [ label, title]);

    if (!Object.keys(data1).length || !Object.keys(data2).length) {
        return <p className="h-full w-full flex justify-center items-center">Loading...</p>
    }

    return (
        <div className="w-full h-fit px-3 pt-3">
            <div className="rounded-md w-full h-full shadow-inner bg-white m-1">
                <h1 className="text-xl text-center">{title}</h1>
                <canvas id={canvasId}></canvas>
            </div>
        </div>
    );
};
