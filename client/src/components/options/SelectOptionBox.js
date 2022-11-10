import React from 'react';

const SelectOptionBox = ({ label, data, addClass, value, onChange }) => {
   return (
      <div>
         {label ? <p className='p-1'>{label}</p> : null}
         <div className={`p-4 rounded-md ${addClass}`}>
            <select
               value={value}
               onChange={onChange}
               className='appearance-none w-full'
            >
               {data?.map((item, index) => (
                  <option key={index} value={item.value}>
                     {item.label}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
};

export default SelectOptionBox;
