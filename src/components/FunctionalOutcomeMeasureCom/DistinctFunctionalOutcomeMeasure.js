import React, { useState, useEffect } from 'react';
import FunctionalOutcomeMeasureNameDetails from './FunctionalOutcomeMeasureNameDetails';
import TheBarthelIndex from './TheBarthelIndex';
import BergBalanceScale from './BergBalanceScale';
import TimedUpandGo from './TimedUpandGo';
import FunctionalReachTest from './FunctionalReachTest';
import MinuteWalkTest from './MinuteWalkTest';
import SittoStandTest from './SittoStandTest';

const ParentComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedYear, setselectedYear] = useState('');
  const [btnselectedOption, setBtnSelectedOption] = useState('');
  const [btnselectedyearOption, setBtnSelectedyearOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to control when to show details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3040/api/getAPIDistinctfunctionalOutcomeMeasureData');
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
        const data = await response.json();
        setOptions(data.getDistinctfunctionalOutcomeMeasureDataList);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    // Set showDetails to true to render the FunctionalOutcomeMeasureNameDetails component
    setBtnSelectedOption(selectedOption);
    setBtnSelectedyearOption(selectedYear);
    setShowDetails(true);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectYear = (event) => {
    setselectedYear(event.target.value);
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className='m-auto mt-8 w-5/12'>
    <div className='flex justify-center flex-col'>
      <h2>Choose Functional Outcome Measure:</h2>
      <div>
        <div>          
          <select value={selectedOption} onChange={handleSelectChange} className='border-2 border-black '>
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>          
          <select value={selectedYear} onChange={handleSelectYear} className='border-2 border-black '>
            <option value="">Select an option</option>            
              <option value="2023">2023</option>
              <option value="2024">2024</option>            
          </select>
        </div>
      </div>
      <button className=" px-6 mt-2 py-3 bg-black text-white cursor-pointer rounded-md" onClick={handleSubmit} disabled={!selectedOption}>Submit</button>
      
      {showDetails && (
        <>
          {selectedOption === 'Tinetti Assessment Tool' ? ( 
          <FunctionalOutcomeMeasureNameDetails selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />          
          ) : selectedOption === '6 Minute Walk Test' ? (
            <MinuteWalkTest selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />
          ): selectedOption === '5x Sit to Stand Test' ? (
            <SittoStandTest selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />
          ) : selectedOption === 'Berg Balance Scale' ? (            
            <BergBalanceScale  selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />
          ) : selectedOption === 'Functional Reach Test' ? (            
            <FunctionalReachTest  selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />
          ) : selectedOption === 'Timed Up and Go' ? (            
            <TimedUpandGo  selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />
          ) : selectedOption === 'The Barthel Index' ? (            
              <TheBarthelIndex selectedYear={btnselectedyearOption} selectedOption={btnselectedOption} />          
          ) : (
            <p>Please Valid option</p>
          )
        }
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default ParentComponent;
