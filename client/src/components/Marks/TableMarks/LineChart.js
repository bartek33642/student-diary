import React from "react";
import "./TableMarksStyle.css";
import { LineSeries, XYPlot, Hint } from 'react-vis';

function LineChartComponent({ lineChartData, selectedPoint, setSelectedPoint }) {
    return (
      <XYPlot height={200} width={300} onMouseLeave={() => setSelectedPoint(null)}>
        <LineSeries
          data={lineChartData}
          onNearestX={(datapoint) => setSelectedPoint(datapoint)}
        />
        {selectedPoint && (
          <Hint value={selectedPoint}>
            <div style={{ color: 'black', fontSize: 18 }}>
              {selectedPoint.label}
            </div>
          </Hint>
        )}
      </XYPlot>
    );
  }

export default LineChartComponent;