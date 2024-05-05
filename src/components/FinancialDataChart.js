import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function FinancialDataChart() {
    const [data, setData] = useState([]);
    const [financialClass, setFinancialClass]=useState([])
    const [formData, setFormData] = useState({
        selectedDate: '',
        selectedOptions: [],
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Fetch data from API using formData.selectedDate and formData.selectedOptions
        try {
            fetchData();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      
    useEffect(() => {
        fetchData();
        fetchhFinacialClassData();
      }, []);
      // Function to handle change in select field
  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      selectedDate: e.target.value,
    });
  };

  // Function to handle change in multiple options
  const handleOptionsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      selectedOptions: selectedOptions,
    });
  };

  const fetchhFinacialClassData = async () => {
    const $FinacialClassDataURL = "http://localhost:3040/api/finacialclassdata";
    try {
        const FinacialClassDataResponse = await fetch($FinacialClassDataURL);
        const jsonFinacialClassData = await FinacialClassDataResponse.json();
        // console.log(jsonFinacialClassData.FinancialClass);
        setFinancialClass(jsonFinacialClassData.FinancialClass)
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
  }


      const fetchData = async () => {
        const $fName = formData.selectedOptions;
        // const $FYear = "2023";
        console.log($fName);
        const $baseUrl = "http://localhost:3040/api/getFanacialyear/"+formData.selectedOptions+"/"+formData.selectedDate;
        console.log($baseUrl)
        try {
          const response = await fetch($baseUrl);
          const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          const jsonData = await response.json();
          const itemsData = jsonData.map(item => ({ label: months[item.month-1], y: item.count }));        
          setData(itemsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const options = {
        animationEnabled: true,
        theme: "light2", //"light2", "dark1", "dark2"
        title: {
          text: "Data Based on financialClass"
        },
        data: [
          {
            type: "line",
            dataPoints:  data.map(item => ({ label: item.label, y: item.y }))
          }
        ]
      };
      const containerProps = {
        height: "300px",
        width: "500px"
      };

    return (
        <div>
            <div>
            <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="date">Select Date:</label>
          {/* <input
            type="date" className='border-2 border-black '
            id="date" min="2023-01-01" max="2025-01-01"
            value={formData.selectedDate}
            onChange={handleDateChange}
          /> */}
          <select 
            id="date"
            value={formData.selectedDate}
            onChange={handleDateChange}>
              <option>2023</option>
              <option>2024</option>
            </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="options">Select Options:</label>
          <select className='border-2 border-black '
            id="options"            
            value={formData.selectedOptions}
            onChange={handleOptionsChange}
          >
            <option value=" ">Select Option</option>
            {financialClass.map(item => ( 
                <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button type="submit" className=' px-6 py-3 bg-black text-white cursor-pointer rounded-md'>Submit</button>
      </form>
            </div>
            <CanvasJSChart containerProps={containerProps} options={options} />
        </div>
    );
}

export default FinancialDataChart