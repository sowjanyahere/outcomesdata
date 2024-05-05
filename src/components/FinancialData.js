import React, { useState } from 'react';

const FinancialData = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    selectedDate: '',
    selectedOptions: [],
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data from API using formData.selectedDate and formData.selectedOptions
    try {
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formData.selectedDate,
          options: formData.selectedOptions,
        }),
      });
      const data = await response.json();
      console.log(data); // Handle API response data here
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle change in select field
  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      selectedDate: e.target.value,
    });
  };

  // Function to handle change in multiple options
  const handleOptionsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      selectedOptions: selectedOptions,
    });
  };

  return (
    <div>
      <h2>Financial Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Select Date:</label>
          <select 
            id="date"
            value={formData.selectedDate}
            onChange={handleDateChange}>
              <option>2023</option>
              <option>2024</option>
            </select>
        </div>
        <div>
          <label htmlFor="options">Select Options:</label>
          <select
            id="options"
            
            value={formData.selectedOptions}
            onChange={handleOptionsChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FinancialData;
