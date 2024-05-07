import React ,{useEffect,useState} from 'react';
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DisciplineTypeChart({chartDisplayData,year}) { 
  
  const [options , setoptions] = useState({
    // Initial options for the chart
    data: [{
      type: "stackedColumn",
      dataPoints: []
    }]
  });
  useEffect(() => {
    console.log("chartDisplayData useeffect " + chartDisplayData);

      setoptions({
          data: [{
            animationEnabled: true,
            title: {
              text: "Composition of Internet Traffic in North America",
            },
            axisX: {
              interval: 1,
              intervalType: "month",
              valueFormatString: "MMMM",
            },
            axisY: {
              //suffix: "%",
            },
            toolTip: {
              shared: true,
            },
            legend: {
              reversed: true,
              verticalAlign: "center",
              horizontalAlign: "right",
            },
            data: chartDisplayData || []
      
        }]
      });
      console.log("options "+ options)
        }, []);
  return (
    <>    
      <div>DisciplineTypeChart  {year}</div>
      {chartDisplayData && <CanvasJSChart options={options} />}
    </>

  )
}

export default DisciplineTypeChart