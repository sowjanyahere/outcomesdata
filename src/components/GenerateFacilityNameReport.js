import React, { useState, useEffect } from 'react';
import GenerateFacilityNameChart from './GenerateFacilityNameChart';
import * as XLSX from 'xlsx';

function GenerateFacilityNameReport({ yearValue , firstSelectValue, secondSelectValue }) {
  console.log("yearValue "+yearValue);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (firstSelectValue && secondSelectValue && yearValue) {
          
          const response = await fetch("http://localhost:3040/api/apiAllDetailsOfFacilityCode/"+firstSelectValue+"/"+secondSelectValue+"/"+yearValue);
          const jsonData = await response.json();
          setData(jsonData.getAllDetailsOfFacilityCodeData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [firstSelectValue, secondSelectValue,yearValue]);
  const exportToExcel = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '_');
    const fileName = `FacilityName_Info_${formattedDate}`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Add heading
    XLSX.utils.sheet_add_aoa(ws, [['First Name', 'Last Name', 'Middle Name','Facility Name' , 'Financial Class', 'Admit Date ' , 'Discipline Type', 'Goal Name','Goal Type']], { origin: 'A1' });
    
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    }
    // Add rows based on data
    let rowIndex = 2; // Starting index for data rows
    data.forEach((rowData) => {
      const { lastName, firstName, middleName , facilityName , financialClass, admitDate , disciplineType , goalName , goalType } = rowData;

      const skillRow = [firstName, lastName,  middleName , facilityName , financialClass , formatDate(admitDate) , disciplineType , goalName ,goalType ]; // Empty placeholders for name, age, city
            XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
            rowIndex++;

           
    });


    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
      {/* Render data fetched from API */}
      {data.length > 0 ? (
        <>
          <div className='flex justify-center gap-10 mt-5 mb-5' style={{alignItems:"center"}}>
          <h1 className='m-0 font-bold'>
            Data of {firstSelectValue} for {secondSelectValue} in {yearValue}
          </h1>
          <button style={{ padding:"15px 30px", backgroundColor: "black", color:"#fff" }} onClick={exportToExcel}>Export to Excel</button>
          </div>   
          <div className='flex justify-center mb-6'>
              <GenerateFacilityNameChart yearValue={yearValue}
            firstSelectValue={firstSelectValue}
            secondSelectValue={secondSelectValue} />
            </div>       
        </>
        
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default GenerateFacilityNameReport;
