import React, { useState, useEffect } from 'react';

function GenerateFacilityNameReport({ firstSelectValue, secondSelectValue }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (firstSelectValue && secondSelectValue) {
          const response = await fetch("http://localhost:3040/api/apiAllDetailsOfFacilityCode/"+firstSelectValue+"/"+secondSelectValue);
          const jsonData = await response.json();
          setData(jsonData.getAllDetailsOfFacilityCodeData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [firstSelectValue, secondSelectValue]);

  return (
    <div>
      {/* Render data fetched from API */}
      {data.length > 0 ? (
        <ul>
          Data Available
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default GenerateFacilityNameReport;
