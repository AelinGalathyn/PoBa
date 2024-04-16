import CircleChartWeek from "@/app/(Charts)/circle_chart";
import LinearChartWeek from "@/app/(Charts)/linear_chart";
import BarChartWeek from "@/app/(Charts)/bar_chart";
import StackedBarLineChartWeek from "@/app/(Charts)/stacked_bar_line";
import StackedLineCatChartWeek from "@/app/(Charts)/stacked_line_cat";
import DoubleBarChartWeek from "@/app/(Charts)/double_bar_chart";

export const renderChart = (
    whichChart: string,
    title: string,
    label: string,
    label1: string,
    label2: string,
    data: Record<string, number>,
    data1: Record<string, number>,
    data2: Record<string, number>,
    canvasId: string
) => {
    return whichChart === "circle" ? (
        <CircleChartWeek title={title} label={label} data={data} canvasId={canvasId}/>
    ) : whichChart === "linear" ? (
        <LinearChartWeek title={title} label={label} data={data} canvasId={canvasId}/>
    ) : whichChart === "bar" ? (
        <BarChartWeek title={title} label={label} data={data} canvasId={canvasId}/>
    ) : whichChart === "barline" ? (
        <StackedBarLineChartWeek title={title} label={label} label1={label1} label2={label2} data1={data1} data2={data2} canvasId={canvasId}/>
    ) : whichChart === "linecat" ? (
        <StackedLineCatChartWeek title={title} label={label} label1={label1} label2={label2} data1={data1} data2={data2} canvasId={canvasId}/>
    ) : whichChart === "doublebar" ? (
        <DoubleBarChartWeek title={title} label={label} label1={label1} label2={label2} data1={data1} data2={data2} canvasId={canvasId}/>
    ) : ("");
};