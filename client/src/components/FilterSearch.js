import React from 'react';

import SelectOptions from './forms/SelectOptions';
import PrimaryButton from './PrimaryButton';

const pages = [];

for (let i = 25; i < 100; i++) {
   pages.push({ name: i });
   i = i + 4;
}

const FilterSearch = ({
   limit,
   onChange,
   onSaveFilter,
   online,
   setOnline,
   sexualOrientation,
   setSexualOrientation,
}) => {
   return (
      <div className='grid grid-cols-4 gap-1'>
         <SelectOptions
            label='Limit'
            value={limit}
            onChange={onChange}
            data={pages}
            bg='bg-white border border-gray text-dark py-0'
         />
         <SelectOptions
            label='On/Off'
            value={online ? 'Online' : 'All'}
            data={[{ name: 'All' }, { name: 'Online' }]}
            onChange={(e) =>
               setOnline(e.target.value === 'Online' ? true : false)
            }
            bg='bg-white border border-gray text-dark py-0'
         />
         <SelectOptions
            label='SexOr'
            data={[
               { name: 'All' },
               { name: 'Straight', value: 'Straight' },
               { name: 'Gay', value: 'Gay' },
               { name: 'Bi', value: 'Bi' },
               { name: 'Lesbian', value: 'Lesbian' },
               { name: 'Transgender', value: 'Transgender' },
            ]}
            value={sexualOrientation ? sexualOrientation : 'All'}
            onChange={(e) => setSexualOrientation(e.target.value)}
            bg='bg-white border border-gray text-dark py-0'
         />
         <div className='flex flex-col justify-center pt-9'>
            <PrimaryButton onClick={onSaveFilter} add='py-[13px] lg:py-[10px]'>
               Save
            </PrimaryButton>
         </div>
      </div>
   );
};

export default FilterSearch;
