import React ,{useState,useEffect} from 'react';
import * as XLSX from 'xlsx';

function GenerateDuplicateGoalData() {
    const [selectyear , setSelectYear] =useState('');
    const [selectedyear , setSelectedYear] =useState('');
    const [data, setData] = useState([]);
    const handleYearChange = (e) => {        
        try {
            setSelectYear(e.target.value);           
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {        
        const fetchData = async () => {            
            const $baseUrl = "http://localhost:3040/api/apiAllDuplicateGoalName/"+selectyear;
            console.log($baseUrl)
            try {
              const response = await fetch($baseUrl);
              const jsonData = await response.json();
              const itemsData = jsonData.getAllDuplicateGoalNameCode; 
              console.log("itemsData "+ itemsData);       
              setData(itemsData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

            fetchData();
      }, [selectyear]);

      const exportToExcel = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '_');
        const fileName = `DuplicateGoalData_Info_${formattedDate}`;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([]);
    
        // Add heading
        XLSX.utils.sheet_add_aoa(ws, [['Goal Name','First Name', 'Last Name', 'Middle Name','Admit Date','Goal Type','Goal StartDate','Goal ProjectedDate','Facility Name' , 'Financial Class' , 'Discipline Type']], { origin: 'A1' });
        
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
            let count=0;
            const {_id,Details } = rowData;
            Details.forEach((innerRowData) => {                
                const {admitDate , lastName , firstName ,middleName,disciplineType,facilityName,financialClass,goalType,goalstartDate,goalprojectedDate } = innerRowData;
                if(count==0){
                    const skillRow = [_id,firstName, lastName,  middleName , formatDate(admitDate) ,goalType,goalstartDate,goalprojectedDate, facilityName , financialClass  , disciplineType  ]; 
                    XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
                    rowIndex++;
                }
                else{
                    const skillRow = [" ",firstName, lastName,  middleName , formatDate(admitDate) ,goalType,goalstartDate,goalprojectedDate, facilityName , financialClass  , disciplineType  ]; 
                    XLSX.utils.sheet_add_aoa(ws, [skillRow], { origin: `A${rowIndex}` });
                    rowIndex++;
                }
                count++;
                
            });
            rowIndex= rowIndex +1;
               
        });
    
    
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
      };
  return (
    <>
        <div>
          <label htmlFor="date">Select Date:</label>
          <select 
            id="year"
            value={selectyear}
            onChange={handleYearChange}>
                <option value=" ">Select Option</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
        </div>
        
            {data.length > 0 ? (
                <button style={{ padding:"15px 30px", backgroundColor: "black", color:"#fff" }} onClick={exportToExcel}>Export to Excel</button>
            ) : (
                <p>No data available</p>
            )}
    
    </>
  )
}

export default GenerateDuplicateGoalData