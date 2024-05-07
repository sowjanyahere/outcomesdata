import React, { useState , useEffect} from 'react';
import GenerateFacilityNameReport from './GenerateFacilityNameReport'

function FinancialClassDetails({selectedFacility}) {
    // console.log("selectedFacility "+ selectedFacility);
    const [selectedFinancialClass, setselectedFinancialClass] = useState('');
  const [financialClass, setFinancialClass] = useState([]);
  const $FinancialClassDataURL = "http://localhost:3040/api/apiAllFinancialClass/"+selectedFacility;
    
  useEffect(() => {
    financialClass.length=0;  
    setFinancialClass(financialClass);
    const fetchFinancialClass = async () => {  
        try {          
            const FinancialClassDataResponse = await fetch($FinancialClassDataURL);
            const jsonFinancialClassData = await FinancialClassDataResponse.json();
            // console.log("jsonFinancialClassData "+jsonFinancialClassData.getAllFinancialClassData);
            setFinancialClass(jsonFinancialClassData.getAllFinancialClassData)
        }
        catch(error){
            console.error('Error fetching data:', error);
        }
      }
      fetchFinancialClass();
    }, [selectedFacility]);

    const handleFinancialClassChange = (event) => {
        setselectedFinancialClass(event.target.value);
      };
      
  return (
    <>
        <div>
      <label>Select FinancialClass:</label>
      <select value={selectedFinancialClass} onChange={handleFinancialClassChange}>
        <option value="">Select a FinancialClass</option>
        {financialClass.map((financialclass, index) => (
          <option key={index} value={financialclass}>{financialclass}</option>
        ))}
      </select>
      <GenerateFacilityNameReport financialClass={selectedFinancialClass}  selectedFacility={selectedFacility} />
    </div>
    </>
    
  )
}

export default FinancialClassDetails