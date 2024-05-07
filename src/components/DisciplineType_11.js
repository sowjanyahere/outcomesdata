import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DisciplineType() {
  const [chartDisplayData, setchartDisplayData] = useState([]);
  const [year, setYear] = useState('');
  const [selectedYear, setselectedYear] = useState('');
  
  const $AlldisciplineTypeDataUrl =
    `http://localhost:3040/api/getAlldisciplineTypeData/${selectedYear}`;

  let colorCode = {
    PT: "Red",
    OT: "Yellow",
    ST: "Green",
    Dysphagia: "Orange",
  };

  let disciplineTypeMap , lineTypeMap = {};
  let subObject = {};
  const handleButtonClick = async () => {
    if (year !== '') {
      setselectedYear(year);
    } else {
      console.log('Please select a year.');
    }
  };

  let jsonData = {
    status: true,
    getAllDisciplineTypeData: [
      {
        _id: "PT",
      },
      {
        _id: "OT",
      },
      {
        _id: "ST",
      },
      {
        _id: "Dysphagia",
      },
    ],
  };

  useEffect(() => {
    const fetchDisciplineTypeData = async () => {
      try {
        const response = await fetch($AlldisciplineTypeDataUrl);
        const disciplineTypeListjsonData = await response.json();
        const disciplineTypeListjsonDataResult =
          disciplineTypeListjsonData.getAlldisciplineTypeDataList;
        const disciplineTypeListjsonDataResults =
          disciplineTypeListjsonDataResult.map((item) => item);
          const jsonAllDisciplineTypeDataResult = jsonData.getAllDisciplineTypeData;
          disciplineTypeMap={};
          lineTypeMap={};
          jsonAllDisciplineTypeDataResult.forEach((rowData) => {
            disciplineTypeMap[rowData._id] = [];
            console.log(rowData._id);
          });
        disciplineTypeListjsonDataResults.forEach((data) => {
          let getKeyArray = disciplineTypeMap[data.disciplines.type]; // disciplineTypeMap["PT"] == []
          if (getKeyArray != null) {
            let objectData = {};
            objectData["y"] = data.disciplines.count;
            objectData["x"] =
              new Date( data.disciplines.year ,data.disciplines.month-1 );
            getKeyArray.push(objectData);
            disciplineTypeMap[data.disciplines.type] = getKeyArray; // disciplineTypeMap["PT"] == [{}]
          };
          if(lineTypeMap[data.disciplines.month-1 +" "+data.disciplines.year]== null){
            lineTypeMap[data.disciplines.month-1 +" "+data.disciplines.year]= data.disciplines.count;
          }else {
            let count = lineTypeMap[data.disciplines.month-1 +" "+data.disciplines.year];
            lineTypeMap[data.disciplines.month-1 +" "+data.disciplines.year] = count + data.disciplines.count
          }
        });
        chartDisplayData.length = 0;
        setchartDisplayData(chartDisplayData);
        Object.keys(disciplineTypeMap).map(
          (key, index) => (
            //console.log("key .... "+key),
            (subObject = {
              type: "stackedColumn",
              name: key,
              color: colorCode[key],
              showInLegend: true,
              xValueFormatString: "YYYY",
              yValueFormatString: '#,##',
              dataPoints: disciplineTypeMap[key],
            }),
            console.log(subObject),
            chartDisplayData.push(subObject)
          )
        );
        let lineDataPoints = {}
        let lineDisplayObjectArray=[];
        Object.keys(lineTypeMap).map(
          (key, index) => (
             lineDataPoints = {
              y: lineTypeMap[key],
              x: new Date( key.split(" ")[1] ,key.split(" ")[0] )
            },
            console.log(lineDataPoints),
            lineDisplayObjectArray.push(lineDataPoints)
          )
        );
        let lineDisplayObject = {
          type: "spline",
          dataPoints: lineDisplayObjectArray
        };
        chartDisplayData.push(lineDisplayObject)
        
  
        setchartDisplayData(chartDisplayData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDisciplineTypeData();
  },[handleButtonClick]);
 

  console.log("chartDisplayData " + chartDisplayData);

  const options = {
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
  
  };

  return (
    <>
      <h1>DisciplineType</h1>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <div>
          <label htmlFor="date">Select Date:</label>
          <select
            className="border-2 border-black "
            id="date"
            value={year} onChange={(e)=> setYear(e.target.value)}
          >
            <option value="">
              Select Option
            </option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <button
          type="button" onClick={handleButtonClick}
          className=" px-6 mt-2 py-3 bg-black text-white cursor-pointer rounded-md"
        >
          Submit
        </button>
      </form>
      <div className="mt-2">
        
        {chartDisplayData && <CanvasJSChart options={options} />}
      </div>
      
    </>
  );
}

export default DisciplineType;
