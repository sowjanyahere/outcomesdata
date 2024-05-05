import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LongTerm_2024() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3040/api/getLongTerm2024');
          const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          const jsonData = await response.json();
          const itemsData = jsonData.map(item => ({ label: months[item._id-1], y: item.count }));        
          setData(itemsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const options = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        title: {
          text: "Long Term Data of Goal Type in 2024"
        },
        data: [
          {
            type: "pie",
            indexLabel: "{label}: {y}",
            dataPoints:  data.map(item => ({ label: item.label, y: item.y }))
          }
        ]
      };
      const containerProps = {
        height: "300px",
        width: "30%"
      };

    return (
        <div>
            <CanvasJSChart containerProps={containerProps} options={options} />
        </div>
    );
}

export default LongTerm_2024;