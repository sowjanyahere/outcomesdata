import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PatientDataBargraph_2023() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3040/api/getPatientData_2023');
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const jsonData = await response.json();
        const itemsData = jsonData.map(item => ({ label: months[item.month-1], y: item.count }))
      
        setData(itemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const options = {
      animationEnabled: true,
      title: {
        text: 'Patients data in the year of 2023'
      },
      data: [{
        type: 'column',
        dataPoints: data.map(item => ({ label: item.label, y: item.y }))
      }]
    };
  
  
      return (
        <div style={{ height: "300px", width: "30%" }}>
              <CanvasJSChart  options={options} />
              
          </div>
      );
}

export default PatientDataBargraph_2023