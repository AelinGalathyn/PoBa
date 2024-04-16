"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";
import {getRandomRgbColor} from "@/app/(Functions)/list_filtering";

interface CircleChartWeekProps {
    title: string;
    label: string;
    data: Record<string, number>;
    canvasId : string;
}

export default function CircleChartWeek({ title, label, data, canvasId }: CircleChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!ctx) return;

        let backgroundColors = [];

        for(let i = 0; i < Object.keys(data).length; i++) {
            backgroundColors.push(getRandomRgbColor());
        }

        const myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    label: label,
                    backgroundColor: backgroundColors
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    }
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
