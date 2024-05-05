import React from 'react';

import PatientDataBargraph_2023 from './PatientDataBargraph_2023';
import PatientDataPie_2023 from './PatientDataPie_2023';
import PatientDataBargraph_2024 from './PatientDataBargaph_2024';

function Patients() {
  return (
    <div>
        <div className='flex justify-start gap-11 mb-52'>
          <PatientDataBargraph_2023/>
          <PatientDataPie_2023/>
        </div>
        <div className='flex'>
        <PatientDataBargraph_2024/>
        </div>
        
    </div>
  )
}

export default Patients