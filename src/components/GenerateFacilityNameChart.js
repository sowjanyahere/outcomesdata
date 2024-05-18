import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function GenerateFacilityNameChart({ yearValue , firstSelectValue, secondSelectValue }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (firstSelectValue && secondSelectValue && yearValue) {
          
          const response = await fetch("http://localhost:3040/api/apiAllFNandFC/"+firstSelectValue+"/"+secondSelectValue+"/"+yearValue);
          const jsonData = await response.json();
          const jsonDataResults = jsonData.getAllFNandFCResult
          const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          const data = jsonDataResults.map(item => ({ label: months[item.month-1], y: item.count }));        
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [firstSelectValue, secondSelectValue,yearValue]);
 
  const options = {
    animationEnabled: true,
    theme: "light1", //"light2", "dark1", "dark2"
    data: [
      {
        type: "line",
        dataPoints:  data.map(item => ({ label: item.label, y: item.y }))
      }
    ]
  };
  const containerProps = {
    height: "300px",
    width: "500px"
  };

  return (
    <div>
      {/* Render data fetched from API */}
      {data.length > 0 ? (
        <>
          <CanvasJSChart containerProps={containerProps} options={options} />
        </>
        
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default GenerateFacilityNameChart;
