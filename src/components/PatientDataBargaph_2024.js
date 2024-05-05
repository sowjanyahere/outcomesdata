import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PatientDataBargaph_2024() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3040/api/getPatientData_2024');
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
        text: 'Patients data in the year of 2024'
      },
      data: [{
        type: 'column',
        dataPoints: data.map(item => ({ label: item.label, y: item.y }))
      }]
    };
    
      return (
        <div style={{ height: "300px", width: "40%" }}>
              <CanvasJSChart options={options} />              
          </div>
      );
}

export default PatientDataBargaph_2024