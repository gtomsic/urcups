import React from 'react';

const LabelValue = ({ label, value, labelClasses, valueClasses }) => {
   return (
      <div className='flex gap-2'>
         <div className={`${labelClasses}`}>{label}:</div>
         <div className={`${valueClasses}`}>{value}</div>
      </div>
   );
};

export default LabelValue;
