import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LenghtOfTreatment() {
    const [data, setData] = useState([]);
    const [getAllFullNames, setgetAllFullNames]=useState([])
    const [formData, setFormData] = useState({selectedDate: '',selectedMonth:'',selectedOptions: []});

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
        fetchhFullNameData();
      }, []);
      // Function to handle change in select field
  
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

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      selectedDate: e.target.value,
    });
  };

  const handleMonthChange = (e) => {
    setFormData({
      ...formData,
      selectedMonth: e.target.value,
    });
  };

  

  const fetchhFullNameData = async () => {
    const $FullNameDataURL = "http://localhost:3040/api/getAllFullNames";
    console.log($FullNameDataURL);
    try {
        const FullNameDataResponse = await fetch($FullNameDataURL);
        const jsonFullNameData = await FullNameDataResponse.json();
        setgetAllFullNames(jsonFullNameData.fullnameOutcome)
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
  }


      const fetchData = async () => {
        const $baseUrl = "http://localhost:3040/api/getLengthoftreatmentbypatientname/"+formData.selectedOptions+"/"+formData.selectedDate+"/"+formData.selectedMonth;
        console.log($baseUrl)
        try {
          const response = await fetch($baseUrl);          
          const jsonData = await response.json();
          console.log("jsonData "+ jsonData.length);
          if(jsonData.length == 0){
            const itemsData = [];
            setData(itemsData)
          }
          else if (Array.isArray(jsonData) && jsonData.length > 0) {
            // Assuming there's only one object in the response array
            const itemsData = jsonData[0].goalInfo.map(item => ({
                        goalType: item.goalType,narrativeGoal: item.narrativeGoal,startDate:item.startDate,projectedDate:item.projectedDate, label: item.startDate.split("-")[1] +'-'+item.projectedDate.split("-")[1], y: item.days
                        
                     }));          
                     setData(itemsData);
          }
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        }      
        
      };
      const options = {
        animationEnabled: true,
        theme: "light2", //"light2", "dark1", "dark2"
        title: {
          text: "Lenght Of Treatment"
        },
        toolTip:{
          content: `Days : {y} <br/>"
          "NarrativeGoal : {narrativeGoal}<br/>"
          "GoalType : {goalType}<br/>"
          "StartDate : {startDate}<br/>"
          "ProjectedDate : {projectedDate}`
        },
        axisY:{
            minimum: 0,
            maximum: 100
       },
        data: [
          {
            type: "column",
            dataPoints:  data.map(item => ({ narrativeGoal: item.narrativeGoal,label: item.label, y: item.y , goalType: item.goalType,startDate:item.startDate,projectedDate:item.projectedDate }))
          }
        ]
      };

  return (
    <div>        
        <form onSubmit={handleSubmit}>
        <div className='mb-2' style={{display:'flex',justifyContent:'center'}}>
          <div>
          <label htmlFor="date">Select Date:</label>
          <select className='border-2 border-black '
            id="date"
            value={formData.selectedDate}
            onChange={handleDateChange}>
                <option value=" " selected>Select Option</option>
              <option>2023</option>
              <option>2024</option>
            </select>
          </div>
          <div className='ms-3'>
          <label htmlFor="date">Select Month:</label>
          <select  className='border-2 border-black '
            id="month"
            value={formData.selectedMonth}
            onChange={handleMonthChange}>
            <option value="Select Month">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
            </select>
          </div>
        </div>
        <div className='mb-2'>
          <label htmlFor="options">Select Options:</label>
          <select className='border-2 border-black '
            id="options"            
            value={formData.selectedOptions}
            onChange={handleOptionsChange}
          >
            <option value=" ">Select Option</option>
            {getAllFullNames.map(item => ( 
                <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button type="submit" className=' px-6 py-3 bg-black text-white cursor-pointer rounded-md'>Submit</button>
        </form>
        <div style={{margin:'2% 10px'}}>
            <p>{data.length}</p>
        <div style={{width:'100%'}}>
        {data.length == 0 ? (
            <p>No data available</p>
      ) : (
        <CanvasJSChart options={options} />        
      )}
        {/* <CanvasJSChart  options={options} /> */}
        </div>
        </div>
        
    </div>
  )
}

export default LenghtOfTreatment