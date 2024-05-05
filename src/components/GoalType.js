import React from 'react';
import ShortTerm_2023 from './ShortTerm_2023';
import ShortTerm_2024 from './ShortTerm_2024';
import LongTerm_2024 from './LongTerm_2024';
import LongTerm_2023 from './LongTerm_2023';
import LongTermBarGraph_2023 from './LongTermBarGraph_2023';
import LongTermBarGraph_2024 from './LongTermBarGraph_2024';

function GoalType() {
  return (
    <div>
      <div style={{display:'flex', gap:'30px',marginBottom:'170px'}}>
        <LongTermBarGraph_2023/>
        <LongTermBarGraph_2024 />
      </div>
      <div style={{display:'flex', gap:'30px',marginBottom:'150px'}}>
        <LongTerm_2023/>
        <LongTerm_2024 />
      </div>
      <div style={{display:'flex', gap:'30px',marginBottom:'50px'}}>
        <ShortTerm_2023/>
        <ShortTerm_2024/>
      </div>      
    </div>
  )
}

export default GoalType