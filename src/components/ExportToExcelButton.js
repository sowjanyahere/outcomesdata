import React from 'react';
import * as XLSX from 'xlsx';
const data = [
    {
      name: 'John',
      age: 30,
      city: 'New York',
      skills: ['JavaScript', 'React', 'Node.js']
    },
    {
      name: 'Alice',
      age: 25,
      city: 'Los Angeles',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Bob',
      age: 35,
      city: 'Chicago',
      skills: ['Python', 'Django', 'Flask']
    }
  ];
  const fileName = "paData"
const GeneratePatientReport = () => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Add heading
    XLSX.utils.sheet_add_aoa(ws, [['Name', 'Age', 'City', 'Skills']], { origin: 'A1' });

    // Add rows based on data
    let rowIndex = 2; // Starting index for data rows
    data.forEach((rowData) => {
      const { name, age, city, skills } = rowData;
      // Add person's details only once
      const personRow = [name, age, city];
      XLSX.utils.sheet_add_aoa(ws, [personRow], { origin: `A${rowIndex}` });
      rowIndex++;
      // Add each skill in a separate row
      skills.forEach((skill) => {
        const skillRow = ['', '', '', skill]; // Empty placeholders for name, age, city
        XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
        rowIndex++;
      });
    });


    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button onClick={exportToExcel}>Export to Excel</button>
  );
};

export default GeneratePatientReport;
