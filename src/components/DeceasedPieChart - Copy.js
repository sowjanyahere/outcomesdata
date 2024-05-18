import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DeceasedPieChart = () => {
  const [year, setYear] = useState("");
  const [selectedyear, setSelectedyear] = useState("");
  const [month, setMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [allDeceasedDataUrl, setDeceasedDataUrl] = useState(" ");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async (allDeceasedDataUrl) => {
      try {
        const response = await fetch(allDeceasedDataUrl);
        const deceasedListjsonData = await response.json();        
        const itemsData = Object.entries(deceasedListjsonData[0]).map(([key, value]) => ({ y: value, label: key }));
        setData(itemsData);
        console.log("deceasedListjsonData " + deceasedListjsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(allDeceasedDataUrl);
  }, [allDeceasedDataUrl]);

  const generatingURL = (selectedMonth,selectedyear) => {
    const generateURL =
      "http://localhost:3040/api/getDeceasedData/" + selectedyear + "/" + selectedMonth;
    setDeceasedDataUrl(generateURL);
  };

  const handleSubmit = async (e) => {
    try {
        const monthData = month;
        const yearData = year;
        console.log("monthData " + monthData );
        console.log("yearData "+yearData);
      setSelectedMonth(monthData);
      setSelectedyear(yearData);
      generatingURL(selectedMonth,selectedyear);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    animationEnabled: true,
    //exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Deceased Data in " + selectedyear
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}",
        dataPoints:  data.map(item => ({ label: item.label, y: item.y }))
      }
    ]
  };
  
  

  return (
    <>      
      <h1 className="mt-2 mb-2 text-center">Deceased Data</h1>
      <form >
        <div className="flex justify-center gap-3">
        <div>
          <label htmlFor="date">Select Year:</label>
          <select
            className="border-2 border-black "
            id="date"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="ms-3">
          <label htmlFor="date">Select Month:</label>
          <select
            className="border-2 border-black "
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="Select Month">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        </div>
       
        <button 
          type="button" onClick={handleSubmit}
          className="m-auto  flex text-center px-6 mt-2 py-3 bg-black text-white cursor-pointer rounded-md"
        >
          Submit
        </button>
      </form>
      <div style={{ height: "300px", width: "100%" }}>
        {data.length > 0 ? ( 
            <div className="flex justify-center">
                <CanvasJSChart  options={options} />
            </div>
        ): (<p className="text-center mt-2">No Data Avaliable</p>)}
        
      </div>
    </>
  );
};

export default DeceasedPieChart;
