import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const FunctionalOutcomeMeasureNameDetails = ({ selectedOption , selectedYear }) => {
  // console.log("selectedOption " + selectedOption);
  // console.log("selectedYear " + selectedYear);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3040/api/getAPIfunctionalOutcomeMeasureData/${selectedOption}/${selectedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await response.json();
        // 65cfd5ba7acac9e61e2dc670
        
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
    const formattedData = {};
    const getPatientdataDetails = async () => {      
      const patientResponse = await fetch(
        `http://localhost:3040/api/getAllPatientData`
      );
      const patientResponsedata = await patientResponse.json();
      patientResponsedata.forEach(item => {
          const details = item.detailsFiltered;
          item.keyDetails.detailsFilteredD.forEach(str => {
              formattedData[str] = details;
          });          
      });      
    }
    getPatientdataDetails();
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
          "Test Details",
          "Test Name",
          "Test Value",
          "Score",
        ],
      ],
      { origin: "A1" }
    );

    // Add rows based on data
    let rowIndex = 2; // Starting index for data rows
    details.forEach((rowData) => {
    let dataCon = rowData.data.map(sublist => sublist.map(pair => pair.join(',')).join(','));
    console.log(dataCon);
      rowData.disciplineTypeData.forEach((innerrowData) => {
        const {
          disciplineType,
          functionalOutcomeMeasureType,
          functionalOutcomeMeasureTest,
        } = innerrowData;
        let count = 0;
        functionalOutcomeMeasureTest.forEach((nestedRowData) => {
          if (count == 0) {
            const skillRow = [
              disciplineType,
              functionalOutcomeMeasureType[0]+" , "+functionalOutcomeMeasureType[1],
              nestedRowData.name,
              ' ',
              ' ',
              ' '
            ];
            // const skillRow = [
            //   disciplineType,
            //   functionalOutcomeMeasureType[0]+" , "+functionalOutcomeMeasureType[1],
            //   nestedRowData.name,
            //   nestedRowData.fields.testDate,
            //   nestedRowData.fields.testTitle,
            //   nestedRowData.fields.testNotes
            // ];
            XLSX.utils.sheet_add_aoa(ws, [skillRow], {
              origin: `A${rowIndex}`,
            });
            rowIndex++;
          } else {
          let innercount = 0;
            nestedRowData.fields.forEach((feildrowData) => {
            if(innercount == 0){
            const skillRow = [
                " ",
                " ",
                nestedRowData.name,
                feildrowData.name,
                feildrowData.value.text,
                feildrowData.value.score,
              ];
              XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                origin: `A${rowIndex}`,
              });
              }
              else{
                const skillRow = [
                " ",
                " ",
                " ",
                feildrowData.name,
                feildrowData.value.text,
                feildrowData.value.score,
              ];
              XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                origin: `A${rowIndex}`,
              });
              
              }
              innercount++;
              rowIndex++;
              
            });
          }
          count++;
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
    <div className="mt-5">
      <h2 className="mb-2 font-bold">Details for {selectedOption}:</h2>
      <div>
      {selectedOption === 'Tinetti Assessment Tool' ? (
          
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
      ) : (
        // Render content for other options here
        <div>
        <p>Need to work on this data</p>
        </div>
      )}
     
        
      </div>
    </div>
  );
};

export default FunctionalOutcomeMeasureNameDetails;
