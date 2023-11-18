import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { generateColorArray } from '../../../../app/utils/colors';

// Register the "arc" element
Chart.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface Props {
    data: string[];
    labels: string[];
    title: string;
}

const PieChart = ({ data, labels, title }: Props) => {
    const chartData = {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: generateColorArray(labels),
        }],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: title
            },
            datalabels: {
                formatter: (value: number, ctx: any) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map((data: number) => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                },
                color: '#000',
            }
        }
    };

    return <Pie data={chartData} options={options} />;
}

export default PieChart;
