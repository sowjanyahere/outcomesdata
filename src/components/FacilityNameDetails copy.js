import React, { useState , useEffect} from 'react';
import FinancialClassDetails from './FinancialClassDetails'

const FacilityNameDetails = () => {
    const [facilityCodes, setFacilityCodes] = useState([])
  const [selectedFacility, setSelectedFacility] = useState('');
  
  
  const $FacilityCodeDataURL = "http://localhost:3040/api/apiAllFacilityCode";
  

  useEffect(() => {
    const fetchFacilityCode = async () => {    
      // console.log($FacilityCodeDataURL);
      try {
          const FacilityCodeDataResponse = await fetch($FacilityCodeDataURL);
          const jsonFullNameData = await FacilityCodeDataResponse.json();
          setFacilityCodes(jsonFullNameData.getAllFacilityCodeData)
      }
      catch(error){
          console.error('Error fetching data:', error);
      }
    }
      fetchFacilityCode();
  }, [$FacilityCodeDataURL]);

  const handleChange = (event) => {
    setSelectedFacility(event.target.value);
  };

  

  return (
    <>
      <div>
      <label>Select Facility Code:</label>
      <select value={selectedFacility} onChange={handleChange}>
        <option value="">Select a facility</option>
        {facilityCodes.map((facility, index) => (
          <option key={index} value={facility}>{facility}</option>
        ))}
      </select>
      <FinancialClassDetails selectedFacility={selectedFacility}/>
      
    </div>
    
    </>
  );
};

export default FacilityNameDetails;
