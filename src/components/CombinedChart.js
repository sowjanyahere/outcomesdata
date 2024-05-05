import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
function CombinedChart() {

    const options = {
        animationEnabled: true,
        title:{
            text: "Composition of Internet Traffic in North America"
        },
        axisX: {
            interval: 1,
            intervalType: "month",
            valueFormatString: "MMMM"
        },
        axisY: {
            suffix: "%"
        },
        toolTip: {
            shared: true
        },
        legend: {
            reversed: true,
            verticalAlign: "center",
            horizontalAlign: "right"
        },
        data: [
          {
            type: "stackedColumn100",
            name: "Real-Time",
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: [
                { x: new Date(2010,0), y: 40 },
                { x: new Date(2010,1), y: 50 },
                { x: new Date(2010,2), y: 60 },
                { x: new Date(2010,3), y: 61 },
                { x: new Date(2010,4), y: 63 },
                { x: new Date(2010,5), y: 65 },
                { x: new Date(2010,6), y: 67 }
            ]
        }, 
        {
            type: "stackedColumn100",
            name: "Web Browsing",
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: [
                { x: new Date(2010,0), y: 28 },
                { x: new Date(2010,1), y: 18 },
                { x: new Date(2010,2), y: 12 },
                { x: new Date(2010,4), y: 10 },
                { x: new Date(2010,5), y: 7 },
                { x: new Date(2010,6), y: 5 }
            ]
        }, 
        {
            type: "stackedColumn100",
            name: "File Sharing",
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: [
                { x: new Date(2010,0), y: 15 },
                { x: new Date(2010,1), y: 12 },
                { x: new Date(2010,2), y: 10 },
                { x: new Date(2010,3), y: 9 },
                { x: new Date(2010,4), y: 7 },
                { x: new Date(2010,5), y: 5 },
                { x: new Date(2010,6), y: 1 }
            ]
        },
        {
            type: "stackedColumn100",
            name: "Others",
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: [
                { x: new Date(2010,0), y: 17 },
                { x: new Date(2010,1), y: 20 },
                { x: new Date(2010,2), y: 18 },
                { x: new Date(2010,3), y: 20 },
                { x: new Date(2010,4), y: 20 },
                { x: new Date(2010,5), y: 23 },
                { x: new Date(2010,6), y: 27 }
            ]
        },
        {        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                {x: new Date(2010,0), y: 450 },
                { x: new Date(2010,1), y: 414},
                { x: new Date(2010,2),y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
                { x: new Date(2010,3),y: 460 },
                {x: new Date(2010,4), y: 450 },
                {x: new Date(2010,5), y: 500 },
                {x: new Date(2010,6), y: 480 }
            ]
        }]
    
    };

    return (
        <div>
            <h2>Combined Chart</h2>
            <CanvasJSChart options={options} />
        </div>
    );
}
export default CombinedChart;