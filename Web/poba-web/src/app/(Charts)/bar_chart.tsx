"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";
import {lab} from "d3-color";

interface BarChartWeekProps {
    title: string;
    label: string;
    data: Record<string, number>;
    canvasId : string;
}

export default function BarChartWeek({ title, label, data, canvasId }: BarChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [
            {
                label: label,
                data: Object.values(data),
                borderColor: "#F4B499",
                backgroundColor: "rgba(244, 180, 153, 0.50)",
                borderWidth: 2,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
            }]},
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

    if (!Object.keys(data).length) {
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
