import React from 'react';

import { init } from 'echarts';

import data from './data.json';
import _ from 'lodash';


export default function LineChart({ option }) {


    const nameGraphRef = React.useRef(null)

    React.useEffect(() => {

        const chartDom = nameGraphRef.current;
        // const chartDom = document.getElementById('teste');

        const myChart = init(chartDom, 'roma');

        option && myChart.setOption(option, true);

    }, [option])

    return (
        <div style={{ width: '100%', height: 'auto', minHeight: '600px' }} ref={nameGraphRef}></div>
    )
}

