import React from 'react';

import SelectOptions from './forms/SelectOptions';
import PrimaryButton from './PrimaryButton';

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
            value={limit}
            onChange={onChange}
            data={[{ name: 18 }, { name: 42 }, { name: 60 }, { name: 78 }]}
            bg='bg-white border border-gray text-dark py-0'
            input='py-[6px] md:py-[14px]'
         />
         <SelectOptions
            value={online ? 'Online' : 'All'}
            data={[{ name: 'All' }, { name: 'Online' }]}
            onChange={(e) =>
               setOnline(e.target.value === 'Online' ? true : false)
            }
            bg='bg-white border border-gray text-dark py-0'
            input='py-[6px] md:py-[14px]'
         />
         <SelectOptions
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
            input='py-[6px] md:py-[14px]'
         />
         <div className='flex flex-col justify-center'>
            <PrimaryButton onClick={onSaveFilter} add='py-[15px] md:p-[14px]'>
               Close
            </PrimaryButton>
         </div>
      </div>
   );
};

export default FilterSearch;
