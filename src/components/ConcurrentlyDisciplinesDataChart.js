import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ConcurrentlyDisciplinesDataChart() {
  const [chartDisplayData, setchartDisplayData] = useState([]);
  const [getAllFullNames, setgetAllFullNames]=useState([])
  const [year, setYear] = useState('');
  const [fullname, setFulName] = useState('');
  const [selectedyear, setselectedyear] = useState('');
  const [selectedfullname, setselectedfullname] = useState('');
  const [alldisciplineTypeDataUrl , setAlldisciplineTypeDataUrl] = useState(" ");
  
  let disciplineTypeMap , lineTypeMap = {};
  let subObject = {};
  let colorCode = {
    PT: "Red",
    OT: "Yellow",
    ST: "Green",
    Dysphagia: "Orange",
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
	  const fetchhFullNameData = async () => {
		const $FullNameDataURL = "http://localhost:3040/api/getAllFullNames";
		console.log($FullNameDataURL);
		try {
			const FullNameDataResponse = await fetch($FullNameDataURL);
			const jsonFullNameData = await FullNameDataResponse.json();
			setgetAllFullNames(jsonFullNameData.fullnameOutcome)
		}
		catch(error){
			console.error('Error fetching data:', error);
		}
	  }
        
		const fetchDisciplineconcurentlyData = async (alldisciplineTypeDataUrl) => {
			try {
				console.log("alldisciplineTypeDataUrl "+alldisciplineTypeDataUrl);
			  const response = await fetch(alldisciplineTypeDataUrl);
			  const disciplineTypeListjsonData = await response.json();
			  const disciplineTypeListjsonDataResult =
				disciplineTypeListjsonData.getconcurrentlydisciplinesDataListResult;
                disciplineTypeMap={};
          jsonData.getAllDisciplineTypeData.forEach((rowData) => {
            disciplineTypeMap[rowData._id] = [];
            // console.log(rowData._id);
          });
          disciplineTypeListjsonDataResult.forEach((data) => {
            data.Details.forEach((detailsData)=>{
                // console.log("Details Data"+ data._id.month +","+ detailsData.disciplineType + "," + detailsData.datesOfVisitsLen)
                let getKeyArray = disciplineTypeMap[detailsData.disciplineType]; // disciplineTypeMap["PT"] == []
                  if (getKeyArray != null) {
                        let objectData = {};
                        objectData["y"] = detailsData.datesOfVisitsLen;
                        objectData["x"] = new Date( selectedyear ,data._id.month-1 );
                        getKeyArray.push(objectData);
                        disciplineTypeMap[detailsData.disciplineType] = getKeyArray;
                  }
            });
        } );
        console.log("disciplineTypeMap "+ disciplineTypeMap);
       
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
       
  
        setchartDisplayData(chartDisplayData);
        console.log("chartDisplayData "+chartDisplayData);

				
			} catch (error) {
			  console.error("Error fetching data:", error);
			}
		  };

		fetchDisciplineconcurentlyData(alldisciplineTypeDataUrl);
        fetchhFullNameData();
      }, [selectedyear,selectedfullname,alldisciplineTypeDataUrl]);
	  


  

  const generatingURL= (selectedfullname,selectedyear)=> {
      const generateURL = "http://localhost:3040/api/getconcurrentlydisciplinesData/"+fullname +"/"+year;
      setAlldisciplineTypeDataUrl(generateURL); 
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {       
		setselectedfullname(fullname);
		setselectedyear(year);		
		generatingURL(selectedfullname,selectedyear)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
 

  const options = {
    animationEnabled: true,
    title: {
      text: "Discipline Type Concurrently Treating ",
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
      <form onSubmit={handleSubmit}>
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
		<div className='mb-2'>
          <label htmlFor="options">Select Options:</label>
          <select className='border-2 border-black '
            id="options"            
            value={fullname}
            onChange={(e)=> setFulName(e.target.value)}
          >
            <option value=" ">Select Option</option>
            {getAllFullNames.map(item => ( 
                <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
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

export default ConcurrentlyDisciplinesDataChart;
