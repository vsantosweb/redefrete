import React from 'react';

import { init }  from 'echarts';

import data from './data.json';
import _ from 'lodash';


export default function DriverStatusOverview({ rangeData, type, groupBy }) {

    const data = rangeData;

    const nameGraphRef = React.useRef(null)


    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 10,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}',
        fontSize: 12,
        rich: {
            name: {}
        }
    };

    const chartData = {
        rangeDates: Object.keys(_.groupBy(data, 'created_at')),
        statuses: Object.keys(_.groupBy(data, groupBy))
    }

    const orderByStatus = _.groupBy(data, groupBy);

    const chartSeries = chartData.statuses.map((status) => {

        return {
            name: status,
            type: type,
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: Object.values(_.groupBy(orderByStatus[status], 'created_at')).map(item => item.length)
        }
    })

    React.useEffect(() => {

        const chartDom = nameGraphRef.current;
        // const chartDom = document.getElementById('teste');

        const myChart = init(chartDom, 'roma');

        const option = {

            tooltip: {
                trigger: 'axis'
            },
           
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 50
                },

            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartData.rangeDates
            },
            yAxis: {
                type: 'value'
            },
            series: chartSeries
        };

        option && myChart.setOption(option);

    }, [chartSeries, chartData.statuses, chartData.rangeDates])
    return (
        <div style={{ width: '100%', height: 'auto', minHeight: '320px' }} id={'teste'} ref={nameGraphRef}></div>
    )
}

