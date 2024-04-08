import CircleChartWeek from "@/app/(Charts)/circle_chart";
import LinearChartWeek from "@/app/(Charts)/linear_chart";

export const renderChart = (
    whichChart: string,
    title: string,
    label: string,
    data: {[dayOfWeek: number]: number },
    canvasId: string
) => {
    return whichChart === "circle" ? (
        <CircleChartWeek title={title} label={label} data={data} canvasId={canvasId}/>
    ) : whichChart === "linear" ? (
        <LinearChartWeek title={title} label={label} data={data} canvasId={canvasId}/>
    ) : ("");
};