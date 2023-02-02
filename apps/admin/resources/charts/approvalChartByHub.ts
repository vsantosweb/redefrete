import data from './data.json';
import { util } from 'echarts';
import _ from 'lodash';

export default function approvalChartByHub(driverRangeData) {
    const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
    ];

    const filterAproval = driverRangeData?.filter(item => item.status);

    const groupByHub = _.groupBy(filterAproval, 'hub');
    const groupByDate = _.groupBy(filterAproval, 'created_at');


    function between(min, max) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
    const dateList = Object.keys(groupByDate);

    // console.log(dateList)
    const dataSet = [];

    for (const hub in groupByHub) {

        const groupByHubDate = _.groupBy(groupByHub[hub], 'created_at');


        // if (hub === 'Curitiba' || hub === 'Limeira') {

            dateList.map(date => {

                dataSet.push({ total: between(10000, 100000), hub: hub, date: date })
    
            })
        // }
        
        // for (const date in groupByHubDate) {

        //     // dataSet.push([groupByHub[hub].length, hub, date])
        //     if (hub === 'Curitiba' || hub === 'Limeira') {
        //         dataSet.push({ total: between(10000, 100000), hub: hub, date: moment(date).format('YYYY-MM-DD') })
        //     }


        // }
    }

    const sourceData = _.sortBy(dataSet, 'date').map(item => [item.total, item.hub, item.date]);

    const hubList = dataSet.map(item => item.hub);

    sourceData.unshift(['Income', 'Hub', 'Date']);


    // console.log(sourceData, 'askfpoksafopkas')

    // console.log(dateList);
    const datasetWithFilters = [];
    const seriesList = [];

    util.each(_.uniq(hubList), function (hub) {

        console.log(hub, 'MERDAAA')
        const datasetId = 'dataset_' + hub;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: [
                {
                    type: 'sort',
                    config: { dimension: 'Date', order: 'asc', parser: 'time' }
                },
                {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'Hub', '=': hub },
                            { dimension: 'Date', '>=': sourceData[1][2], parser: 'time' },
                        ]
                    }
                },

            ]
            // transform: {
            //     type: 'filter',
            //     config: {
            //         and: [
            //             { dimension: 'Hub', '=': hub },
            //             { dimension: 'Date', '>=': sourceData[1][2], parser: 'time' },
            //         ]
            //     }
            // }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: hub,
            // endLabel: {
            //     show: true,
            //     formatter: function (params) {

            //         return params.value[1] + ': ' + params.value[0];
            //     }
            // },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'Date',
                y: 'Income',
                label: ['Hub', 'Income'],
                itemName: 'Date',
                tooltip: ['Income']
            }
        });
    });

    const option = {
        animationDuration: 6000,
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 50
            },

        ],
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: -30,
            top: 10,
            bottom: 0,
          },
        dataset: [
            {
                id: 'dataset_raw',
                source: sourceData
            },
            ...datasetWithFilters
        ],

        // tooltip: {
        //     order: 'valueDesc',
        //     trigger: 'axis'
        // },
        xAxis: {
            type: 'category',
            nameLocation: 'middle',
        },


        yAxis: {
            name: 'Income'
        },
        grid: {
            right: '14%',
            left: '4%'
        },
        series: seriesList
    };

    return { option }

}