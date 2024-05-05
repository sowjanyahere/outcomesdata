import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DisciplineType() {
  const $DisciplineTypeUrl = "http://localhost:3040/api/apiDisciplineType";
  const $AlldisciplineTypeDataUrl = "http://localhost:3040/api/getAlldisciplineTypeData/2024";
  useEffect(() => {
    fetchDisciplineTypeData();
  }, [$DisciplineTypeUrl,$AlldisciplineTypeDataUrl]);

  const fetchDisciplineTypeData = async () => {
    try{
      const response = await fetch($DisciplineTypeUrl);
          
          const jsonData = await response.json();
          const jsonAllDisciplineTypeDataResult = jsonData.getAllDisciplineTypeData[0];
          console.log("jsonAllDisciplineTypeDataResult "+ jsonAllDisciplineTypeDataResult._id);
          const jsonAllDisciplineTypeData = jsonAllDisciplineTypeDataResult.map(item => ({label: item}));        
          console.log("jsonAllDisciplineTypeData "+ jsonAllDisciplineTypeData);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (   
    <>

    </>)
}

export default DisciplineType