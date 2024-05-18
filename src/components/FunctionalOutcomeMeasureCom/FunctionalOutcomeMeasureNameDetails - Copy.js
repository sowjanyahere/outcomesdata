import React, { useState, useEffect } from 'react';

const FunctionalOutcomeMeasureNameDetails = ({ selectedOption }) => {
    console.log("selectedOption "+selectedOption);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3040/api/getAPIfunctionalOutcomeMeasureData/${selectedOption}`);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (selectedOption) {
      fetchData();
    } else {
      setDetails(null);
    }
  }, [selectedOption]);

  if (!selectedOption) {
    return <div>Please select an option.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Details for {selectedOption}:</h2>
      <div>
      {details.map((outcomeMeasure, index) => (
        <div key={index}>
          <h2>Functional Outcome Measure #{index + 1}</h2>
          <p>Test Date: {outcomeMeasure.disciplineTypeData[0].functionalOutcomeMeasureTest[0].fields.testDate}</p>
          <p>Test Title: {outcomeMeasure.disciplineTypeData[0].functionalOutcomeMeasureTest[0].fields.testTitle}</p>
          <h3>Balance Task</h3>
          <ul>
            {outcomeMeasure.disciplineTypeData[0].functionalOutcomeMeasureTest[1].fields.map((field, i) => (
              <li key={i}>
                <strong>{field.name}:</strong> {field.value.text}
              </li>
            ))}
          </ul>
          <h2>**********************</h2>
          {/* Render other tasks if needed */}
        </div>
        
      ))}
      </div>
    </div>

  );
};

export default FunctionalOutcomeMeasureNameDetails;
