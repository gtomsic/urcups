import React from 'react'

const SelectOptions = ({ data, value, onChange, label, bg, input }) => {
   return (
      <div className='flex flex-col gap-2 my-2 text-lg text-dark'>
         {!label ? null : <label className='px-4 text-light'>{label}</label>}
         <div className={`rounded-md overflow-hidden w-full pr-4 ${bg}`}>
            <select
               value={value}
               onChange={onChange}
               id='option'
               className={`rounded-md block overflow-hidden  w-full py-4 pl-4 ${input}`}
            >
               {data.map((item, index) => (
                  <option
                     key={index}
                     value={item?.value ? item?.value : item.name}
                     className='bg-dark text-white'
                  >
                     {item.name}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

SelectOptions.defaultProps = {
   data: [{ name: '-' }, { name: 'Male' }, { name: 'Female' }],
   label: '',
   bg: 'bg-white',
}

export default SelectOptions
