import React from "react";
import "./TableMarksStyle.css";
import { XYPlot, VerticalBarSeries, YAxis, XAxis } from 'react-vis';

function BarChartComponent ({ barChartData }){
    return(
    <XYPlot height={250} width={400}>
    <VerticalBarSeries data={barChartData} />
    <XAxis title="Przedmioty" tickFormat={v => barChartData[v].label} tickLabelAngle={-55}     
    style={{
        text: {stroke: 'none', fill: '#000000', fontWeight: 600}
      }}/>
    <YAxis title="Liczba ocen"
      style={{
        text: {stroke: 'none', fill: '#000000', fontWeight: 600}
      }} />
  </XYPlot>
    );
}

export default BarChartComponent;