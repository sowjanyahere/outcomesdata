import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul>
        <li>
          <Link to="/patient-data">Patient Data</Link>
        </li>
        <li>
          <Link to="/financial-data">Financial Data</Link>
        </li>
        <li>
          <Link to="/goal-type-data">Goal Type Data</Link>
        </li>
        <li>
          <Link to="/DateOfVisits">Date Of visits Data</Link>
        </li>
        <li>
          <Link to="/genaratepatientreport">Patient Report</Link>
        </li>
        <li>
          <Link to="/LenghtOfTreatment">LenghtOfTreatment</Link>
        </li>
        <li>
          <Link to="/CombinedChart">CombinedChart</Link>        
        </li>
        <li>
          <Link to="/FacilityNameDetails">FacilityNameDetails</Link>
        </li>
        <li>
          <Link to="/DisciplineType">DisciplineType</Link>
        </li>
        <li>
          <Link to="/GenerateDuplicateGoalData">GenerateDuplicateGoalData</Link>
        </li>
        <li>
          <Link to="/ConcurrentlyDisciplinesDataChart">ConcurrentlyDisciplinesDataChart</Link>
        </li>
        
    </ul>
    
  )
}

export default Navbar