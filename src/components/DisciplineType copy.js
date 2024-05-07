import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DisciplineType() {
  const [chartDisplayData, setchartDisplayData] = useState([]);
  const $DisciplineTypeUrl = "http://localhost:3040/api/apiDisciplineType";
  const $AlldisciplineTypeDataUrl = "http://localhost:3040/api/getAlldisciplineTypeData/2024";
  
  useEffect(() => {
    fetchDisciplineType();
    fetchDisciplineTypeData();
  }, [$AlldisciplineTypeDataUrl]);
  
  const disciplineTypeMap = {};
  const fetchDisciplineType = async () => {
    try{
      const response = await fetch($DisciplineTypeUrl);
          
          const jsonData = await response.json();
          const jsonAllDisciplineTypeDataResult = jsonData.getAllDisciplineTypeData;
          jsonAllDisciplineTypeDataResult.forEach((rowData) => {
            disciplineTypeMap[rowData._id] = [];
          });
          //setDistinctDisciplineTypeData(distinctDisciplineTypeData)
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  let colorCode = {
    "PT":"Red",
    "OT":"Yellow",
    "ST":"Green",
    "Dysphagia":"Orange"
    };
    
    let subObject={};

  const fetchDisciplineTypeData = async () => {
    try{
      const response = await fetch($AlldisciplineTypeDataUrl);
          
          const disciplineTypeListjsonData = await response.json();    
          const disciplineTypeListjsonDataResult = disciplineTypeListjsonData.getAlldisciplineTypeDataList;  
          const disciplineTypeListjsonDataResults = disciplineTypeListjsonDataResult.map((item)=>(item)); 
          disciplineTypeListjsonDataResults.forEach((data) => {
            //console.log(data.disciplines.type,data.disciplines.count,data.disciplines.month,data.disciplines.year);
            let getKeyArray=disciplineTypeMap[data.disciplines.type]; // disciplineTypeMap["PT"] == []
            if(getKeyArray != null){
              let objectData={};
              objectData["y"]=data.disciplines.count;
              objectData["x"]="new Date("+data.disciplines.year+", "+data.disciplines.month+")";
              getKeyArray.push(objectData);
              disciplineTypeMap[data.disciplines.type]=getKeyArray // disciplineTypeMap["PT"] == [{}]
            }
          });
          
        //   Object.keys(disciplineTypeMap).map((key, index) => (           
        //      console.log("Key "+ key + " " + "Value "+ disciplineTypeMap[key]),
        //     disciplineTypeMap[key].forEach((chartData)=>{
        //     //  console.log(key + " chartData "+ chartData.x +" "+ chartData.y);
        //     })
        // ))
        Object.keys(disciplineTypeMap).map((key, index) => (
          //console.log("key .... "+key),
          subObject=      {
            type: "stackedColumn",  
            name: key,
            color: colorCode[key],
            showInLegend: true,
            xValueFormatString: "YYYY",
            yValueFormatString: "#,##0\"%\"",
            dataPoints: disciplineTypeMap[key]
        },
        console.log(subObject),
        chartDisplayData.push(subObject)    
      )) ;

      setchartDisplayData(chartDisplayData)

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
 
   
  console.log("chartDisplayData "+ chartDisplayData);
  

    
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
    data: chartDisplayData
 
};

  return (   
    <>
        <h1>DisciplineType</h1>
        
        <CanvasJSChart options={options} />

    </>)
}

export default DisciplineType