import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
// import { Container } from './styles';
import data from './data.json';
import _ from 'lodash';

export default function ApexChart() {
    const chartData = {
        rangeDates: Object.keys(_.groupBy(data.data, 'created_at')),
        statuses: Object.keys(_.groupBy(data.data, 'status'))
    }

    const orderByStatus = _.groupBy(data.data, 'status');


    const chartSeries = chartData.statuses.map((status) => {

        return {
            name: status,
            data: Object.values(_.groupBy(orderByStatus[status], 'created_at')).map(item => item.length)
          }
    })


    const options = {

        series: chartSeries,
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: chartData.rangeDates,
                type: 'category',
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },

    }
    return (
        <ApexCharts options={options} series={options.series} type="bar" height={350} />
    )
}