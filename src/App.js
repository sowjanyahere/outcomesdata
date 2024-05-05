import './App.css';
import Navbar from './components/Navbar';
import Patients from './components/Patients';
import FinancialClass from './components/FinancialClass';
import GoalType from './components/GoalType';
import DateOfVisits from './components/DateOfVisits';
import GeneratePatientReport from './components/GeneratePatientReport';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import LenghtOfTreatment from './components/LenghtOfTreatment';
import CombinedChart from './components/CombinedChart';
import  DisciplineType from './components/DisciplineType'
function App() {
  return (
    <Router>
      <div className="App">
     <div>
      <Navbar/>
      <Routes>
          <Route path="/patient-data" element={<Patients/>} />
          <Route path="/financial-data" element={<FinancialClass/>} />
          <Route path="/goal-type-data" element={<GoalType/>} />
          <Route path="/DateOfVisits" element={<DateOfVisits/>} /> 
          <Route path="/genaratepatientreport" element={<GeneratePatientReport/>} /> 
          <Route path="/LenghtOfTreatment" element={<LenghtOfTreatment/>} /> 
          <Route path="/CombinedChart" element={<CombinedChart/>} />
          <Route path="/DisciplineType" element={<DisciplineType/>} />
      </Routes>
      
      
     </div>
    
    </div>
    </Router>
    
  );
}

export default App;
