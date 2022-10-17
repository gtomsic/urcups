import React from 'react'
import { countries } from '../data/countries'

import SelectOptions from './forms/SelectOptions'
import PrimaryButton from './PrimaryButton'

const FilterSearch = ({ limit, onChange, onSaveFilter }) => {
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
            data={[{ name: 'All' }, { name: 'Online' }]}
            bg='bg-white border border-gray text-dark py-0'
            input='py-[6px] md:py-[14px]'
         />
         <SelectOptions
            data={countries}
            bg='bg-white border border-gray text-dark py-0'
            input='py-[6px] md:py-[14px]'
         />
         <div className='flex flex-col justify-center'>
            <PrimaryButton
               onClick={onSaveFilter}
               add='py-[15px] md:p-[13px] from-dark bg-primary'
            >
               Close
            </PrimaryButton>
         </div>
      </div>
   )
}

export default FilterSearch
