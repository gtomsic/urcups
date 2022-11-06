import React from 'react';

const SelectOptionBox = ({ label, data, addClass, onChange }) => {
   return (
      <div>
         {label ? <p className='p-1'>{label}</p> : null}
         <div className={`bg-white py-4 pl-4 rounded-md ${addClass}`}>
            <select onChange={onChange} className='appearance-none w-full'>
               {data?.map((item) => (
                  <option value={item.value}>{item.label}</option>
               ))}
            </select>
         </div>
      </div>
   );
};

export default SelectOptionBox;
