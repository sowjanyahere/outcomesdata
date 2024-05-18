import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";

const TheBarthelIndex = ({ selectedOption , selectedYear }) => {
    console.log("selectedOption "+selectedOption);
    console.log("selectedOption "+selectedYear);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3040/api/getAPIfunctionalOutcomeMeasureData/${selectedOption}/${selectedYear}`);
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
  }, [selectedOption,selectedYear]);

  const exportToExcel = () => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "_");
    const fileName = `Tinetti_Assessment_Tool${formattedDate}`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Add heading
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "Discipline Type",
          "functionalOutcomeMeasureType",
          "Name",
          "Value",
          "Label",
        ],
      ],
      { origin: "A1" }
    );

    // Add rows based on data
    let rowIndex = 2; // Starting index for data rows
    details.forEach((rowData) => {
    
      rowData.disciplineTypeData.forEach((innerrowData) => {
        const {
          disciplineType,
          functionalOutcomeMeasureType,
          functionalOutcomeMeasureTest,
        } = innerrowData;
        let count = 0;
        functionalOutcomeMeasureTest.forEach((nestedRowData) => {
          if(nestedRowData.value){
            const skillRow = [
              disciplineType,
              functionalOutcomeMeasureType[0]+" , "+functionalOutcomeMeasureType[1],
              nestedRowData.name,
              nestedRowData.value.value,
              nestedRowData.value.label,
            ];
            XLSX.utils.sheet_add_aoa(ws, [skillRow], {
              origin: `A${rowIndex}`,
            });
            rowIndex++;
          }
          else{
            const skillRow = [
              disciplineType,
              functionalOutcomeMeasureType[0]+" , "+functionalOutcomeMeasureType[1],
              nestedRowData.name,
              ' ',
              ' '
            ];
            XLSX.utils.sheet_add_aoa(ws, [skillRow], {
              origin: `A${rowIndex}`,
            });
            rowIndex++;
          }
         
        });
        rowIndex++;
      });
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

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
      {details.length > 0 && (
        <div>
        <button
     style={{
       padding: "15px 30px",
       backgroundColor: "black",
       color: "#fff",
     }}
     onClick={exportToExcel}
   >
     Export to Excel
   </button>
     </div>
      )}
      </div>
    </div>

  );
};

export default TheBarthelIndex;
