import React, { useState, useEffect } from "react";
import GenerateFacilityNameReport from "./GenerateFacilityNameReport";
function FacilityNameDetails() {
  const [firstSelectOptions, setFirstSelectOptions] = useState([]);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [firstSelectValue, setFirstSelectValue] = useState("");
  const [secondSelectValue, setSecondSelectValue] = useState("");
  const [firstSelectValueData, setfirstSelectValueData] = useState("");
  const [secondSelectValueData, setsecondSelectValueData] = useState("");
  const [yearSelectValue, setyearSelectValue] = useState("");
  const [yearSelectValueData, setyearSelectValueData] = useState("");

  useEffect(() => {
    // Fetch data for the first select field options from the first API
    const fetchFirstSelectOptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3040/api/apiAllFacilityName"
        );
        const jsonData = await response.json();
        setFirstSelectOptions(jsonData.getAllFacilityCodeData);
      } catch (error) {
        console.error("Error fetching first select options:", error);
      }
    };

    fetchFirstSelectOptions();
  }, []);

  const handleYearSelectChange = (event) => {
    // Set the value of the first select field
    setyearSelectValue(event.target.value);
  };

  const handleFirstSelectChange = (event) => {
    // Set the value of the first select field
    setFirstSelectValue(event.target.value);
    setSecondSelectValue(" ");
    // Fetch data for the second select field options using the selected value from the first select field
    const fetchSecondSelectOptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3040/api/apiAllFinancialClass/${event.target.value}`
        );
        const jsonData = await response.json();
        setSecondSelectOptions(jsonData.getAllFinancialClassData);
      } catch (error) {
        console.error("Error fetching second select options:", error);
      }
    };

    fetchSecondSelectOptions();
  };

  const handleSecondSelectChange = (event) => {
    // Set the value of the second select field
    setSecondSelectValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Handle button click, you can access firstSelectValue and secondSelectValue here
    setfirstSelectValueData(firstSelectValue);
    setsecondSelectValueData(secondSelectValue);
    setyearSelectValueData(yearSelectValue);
  };

  return (
    <div>
      <div className="mt-10 mb-5 flex gap-10 justify-center">
        <div>
          <label className="me-5">Select Year:</label>
          <select
            value={yearSelectValue}
            className="border-2 border-black "
            onChange={handleYearSelectChange}
          >
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div>
          <label className="me-5">Select Facility Name:</label>
          <select
            value={firstSelectValue}
            className="border-2 border-black "
            onChange={handleFirstSelectChange}
          >
            <option value="">Select Facility Name</option>
            {firstSelectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="me-5">Select Financial Class:</label>
          <select
            value={secondSelectValue}
            className="border-2 border-black "
            onChange={handleSecondSelectChange}
          >
            <option value="">Select Financial Class</option>
            {secondSelectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Button to trigger the action */}
      <div>
        <button
          style={{
            padding: "15px 30px",
            backgroundColor: "black",
            color: "#fff",
          }}
          onClick={handleButtonClick}
        >
          Get Data
        </button>
      </div>

      <div>
        <div className="d-flex">
          
          <GenerateFacilityNameReport
            yearValue={yearSelectValueData}
            firstSelectValue={firstSelectValueData}
            secondSelectValue={secondSelectValueData}
          />
        </div>
      </div>
    </div>
  );
}

export default FacilityNameDetails;
