// Chart.js
import React from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartData = ({ chartData }) => {
  const options = {
    // Customize your chart options here
    data: [{
      type: "column",
      dataPoints: chartData.map(data => ({
        label: data.label,
        y: data.value
      }))
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ChartData;
