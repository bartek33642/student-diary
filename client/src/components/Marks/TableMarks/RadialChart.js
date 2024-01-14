import React from 'react';
import { RadialChart } from 'react-vis';

const RadialChartComponent = ({ data }) => {
  return (
    <RadialChart
      data={data}
      width={300}
      height={300}
      showLabels
      labelsRadiusMultiplier={1.15}
    />
  );
};

export default RadialChartComponent;
