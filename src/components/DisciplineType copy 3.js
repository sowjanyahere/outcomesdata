import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');
import DisciplineTypeChart from './DisciplineTypeChart';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DisciplineType() {
  const [year, setYear] = useState('');
  const [selectedYear, setselectedYear] = useState('');

  const handleButtonClick = async () => {
    if (year !== '') {
      setselectedYear(year)
    } else {
      console.log('Please select a year.');
    }
  };


  return (
    <>
      <h1>DisciplineType</h1>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <div>
          <label htmlFor="date">Select Date:</label>
          <select
            className="border-2 border-black "
            id="year"
            value={year} onChange={(e) => setYear(e.target.value)}
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
        <DisciplineTypeChart year={selectedYear}/>
      </div>
      
    </>
  );
}

export default DisciplineType;
