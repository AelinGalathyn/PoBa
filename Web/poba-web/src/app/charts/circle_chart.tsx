import { useEffect } from "react";
import Chart from "chart.js/auto";

interface CircleChartWeekProps {
    title: string;
    label: string;
    isChart1: boolean;
    data: { [dayOfWeek: number]: number; };
}

export default function CircleChartWeek({ title, label, isChart1, data }: CircleChartWeekProps) {

    useEffect(() => {
        const ctx = document.getElementById(isChart1 ? "myChart" : "myChart2") as HTMLCanvasElement;
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    label: label,
                    backgroundColor: [
                        "rgb(41,141,255)",
                        "rgb(35,122,88)",
                        "rgb(42,159,48)",
                        "rgb(122,169,59)",
                        "rgb(203,229,33)",
                        "rgb(255,236,55)",
                        "rgb(255,143,81)",
                    ],
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
