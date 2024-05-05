import React, { useState , useEffect} from 'react';
import * as XLSX from 'xlsx';

const GeneratePatientReport = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3040/api/generatePatientsReport');
        const jsonData = await response.json();
        setPatientData(jsonData.fullnameOutcome);
    }
    catch {

    }
  };
 
const exportToExcel = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '_');
    const fileName = `Patient_Report_Info_${formattedDate}`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Add heading
    XLSX.utils.sheet_add_aoa(ws, [['First Name', 'Last Name', 'Middle Name','Date Of Visits', 'Patient Report Info']], { origin: 'A1' });
    const patientDataInfo = new Set();
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    }
    // Add rows based on data
    let rowIndex = 2; // Starting index for data rows
    patientData.forEach((rowData) => {
      const { lastName, firstName, middleName, datesOfVisits, subjective } = rowData;
      
      let patientNameInfo = firstName +" "+ lastName + " "+ middleName;

      if(patientDataInfo.has(patientNameInfo)){
        const skillRow = ['', '', '', formatDate(datesOfVisits[subjective.index]) , subjective.patientReport  ]; // Empty placeholders for name, age, city
                XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
                rowIndex++;
      }
      else{
        if(rowIndex!= 2){
          rowIndex++;
        }
        patientDataInfo.add(patientNameInfo);
        const skillRow = [firstName, lastName,  middleName,formatDate(datesOfVisits[subjective.index]), subjective.patientReport]; // Empty placeholders for name, age, city
            XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
            rowIndex++;
      }      
    });


    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
      <h1 style={{marginBottom:"20px"}}>Click Here to get the Data</h1>
      <button style={{ padding:"15px 30px", backgroundColor: "black", color:"#fff" }} onClick={exportToExcel}>Export to Excel</button>
      
    </div>
  );
};

export default GeneratePatientReport;
