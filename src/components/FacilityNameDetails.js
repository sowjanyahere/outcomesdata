import React, { useState, useEffect } from 'react';
import GenerateFacilityNameReport from './GenerateFacilityNameReport';
function FacilityNameDetails() {
  const [firstSelectOptions, setFirstSelectOptions] = useState([]);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('');
  const [firstSelectValueData, setfirstSelectValueData] = useState('');
  const [secondSelectValueData, setsecondSelectValueData] = useState('');

  useEffect(() => {
    // Fetch data for the first select field options from the first API
    const fetchFirstSelectOptions = async () => {
      try {
        const response = await fetch('http://localhost:3040/api/apiAllFacilityCode');
        const jsonData = await response.json();
        setFirstSelectOptions(jsonData.getAllFacilityCodeData);
      } catch (error) {
        console.error('Error fetching first select options:', error);
      }
    };

    fetchFirstSelectOptions();
  }, []);

  const handleFirstSelectChange = (event) => {
    // Set the value of the first select field
    setFirstSelectValue(event.target.value);
    setSecondSelectValue(' ')
    // Fetch data for the second select field options using the selected value from the first select field
    const fetchSecondSelectOptions = async () => {
      try {
        const response = await fetch(`http://localhost:3040/api/apiAllFinancialClass/${event.target.value}`);
        const jsonData = await response.json();
        setSecondSelectOptions(jsonData.getAllFinancialClassData);
      } catch (error) {
        console.error('Error fetching second select options:', error);
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
  };

  return (
    <div>
      {/* First select field */}
      <select value={firstSelectValue} onChange={handleFirstSelectChange}>
        <option value="">Select...</option>
        {firstSelectOptions.map((option,index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>

      {/* Second select field */}
      <select value={secondSelectValue} onChange={handleSecondSelectChange}>
        <option value="">Select...</option>
        {secondSelectOptions.map((option,index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>

      {/* Button to trigger the action */}
      <button onClick={handleButtonClick}>Get Values</button>
      <div>
        <p>{firstSelectValueData}</p>
        <p>{secondSelectValueData}</p>
        
        <GenerateFacilityNameReport firstSelectValue={firstSelectValueData} secondSelectValue={secondSelectValueData} />
      </div>
    </div>
  );
}

export default FacilityNameDetails;
