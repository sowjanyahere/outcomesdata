// ChartContainer.js
import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import axios from 'axios';

const ChartContainer = () => {
  const [selectedYear, setSelectedYear] = useState('2024'); // Default selected year
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const fetchData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:3040/api/getAlldisciplineTypeData/2023`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="2024">2024</option>
        {/* Add other year options as needed */}
      </select>
      <Chart chartData={chartData} />
    </div>
  );
};

export default ChartContainer;
