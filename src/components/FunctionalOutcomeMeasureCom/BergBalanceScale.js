import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const BergBalanceScale = ({ selectedOption , selectedYear }) => {
  // console.log("selectedOption " + selectedOption);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // console.log(`http://localhost:3040/api/getAPIfunctionalOutcomeMeasureData/${selectedOption}/${selectedYear}`);
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
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "_");
    const fileName = `Berg_Balance_Scale_${formattedDate}`;
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
          "sn",
          "name",
          "value",
          "instruction",
          "note"
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
          if (count == 0) {
            const skillRow = [
              disciplineType,
              functionalOutcomeMeasureType[0]+" , "+functionalOutcomeMeasureType[1],
              nestedRowData.name,
              ' ',
              ' ',
              ' ',
              ' ',
              ' '
            ];
            XLSX.utils.sheet_add_aoa(ws, [skillRow], {
              origin: `A${rowIndex}`,
            });
            rowIndex++;
          } else {
          let innercount = 0;
            nestedRowData.fields.forEach((feildrowData) => {
                if(innercount == 0){
                    if(feildrowData.note){
                        const skillRow = [
                            " ",
                            " ",
                            nestedRowData.name,
                            feildrowData.sn,
                            feildrowData.name,
                            feildrowData.value,
                            feildrowData.instruction,
                            feildrowData.note,
                          ];
                          XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                            origin: `A${rowIndex}`,
                          });
                          }
                          else{
                            const skillRow = [
                                " ",
                                " ",
                                nestedRowData.name,
                                feildrowData.sn,
                                feildrowData.name,
                                feildrowData.value,
                                feildrowData.instruction,
                                 ' ',
                              ];
                          XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                            origin: `A${rowIndex}`,
                          });
                          
                          }
                  }
                  else{
                    if(feildrowData.note){
                        const skillRow = [
                            " ",
                            " ",
                            ' ',
                            feildrowData.sn,
                            feildrowData.name,
                            feildrowData.value,
                            feildrowData.instruction,
                            feildrowData.note,
                          ];
                          XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                            origin: `A${rowIndex}`,
                          });
                          }
                          else{
                            const skillRow = [
                                " ",
                                " ",
                                ' ',
                                feildrowData.sn,
                                feildrowData.name,
                                feildrowData.value,
                                feildrowData.instruction,
                                 ' ',
                              ];
                          XLSX.utils.sheet_add_aoa(ws, [skillRow], {
                            origin: `A${rowIndex}`,
                          });
                          
                          }
                  
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

export default BergBalanceScale;
