import React from 'react';
import { Page } from './_app';

import * as echarts from 'echarts';


const Home: Page = () => {

  React.useEffect(() => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);

  }, [])

  return (
      <div style={{width: '500px', height: '300px'}} id={'main'}></div>
  )
}


Home.config = {
  title: 'Dashboard',
  layout:'AccountLayout'
}

export default Home
