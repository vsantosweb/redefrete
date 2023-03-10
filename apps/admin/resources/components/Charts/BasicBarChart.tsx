import React from 'react';

import  { init }  from 'echarts';

import data from './data.json';
import _ from 'lodash';


export default function BasicBarChart({ rangeData, orderBy, options = null }) {

    const data = rangeData;

    const nameGraphRef = React.useRef(null)


    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 10,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 14,
        rich: {
            name: {}
        }
    };

    const xAxis = Object.keys(_.groupBy(data, orderBy));

    const orderedBy = _.groupBy(data, orderBy);

    const series = Object.keys(orderedBy).map(key => orderedBy[key].length)


    // const chartSeries = chartData.rangeDates.map((date) => {

    //     return {
    //         type: 'bar',
    //         barGap: 0,
    //         label: labelOption,
    //         data: orderBy[date].map(item => item.length)
    //     }
    // })

    React.useEffect(() => {

        const chartDom = nameGraphRef.current;
        // const chartDom = document.getElementById('teste');

        const myChart = init(chartDom, 'roma');

        const option = {

            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data: ['Aptos']
            // },
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
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: series,
                    type: 'bar',
                    showBackground: true,
                  
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };

        option && myChart.setOption(option);

    }, [series, xAxis, options])

    return (
        <div style={{ width: '100%', height: 'auto', minHeight: '320px' }} ref={nameGraphRef}></div>
    )
}

