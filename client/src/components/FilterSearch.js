import React from "react";
import { countries } from "../data/countries";
import Button from "./Button";

import SelectOptions from "./forms/SelectOptions";

const FilterSearch = ({ limit, onChange, onSaveFilter }) => {
   return (
      <div className="grid grid-cols-4 gap-2 mb-5">
         <SelectOptions
            value={limit}
            onChange={onChange}
            data={[{ name: 18 }, { name: 42 }, { name: 60 }, { name: 78 }]}
            bg="bg-dark border border-gray text-white"
         />
         <SelectOptions
            data={[{ name: "All" }, { name: "Online" }]}
            bg="bg-dark border border-gray text-white"
         />
         <SelectOptions
            data={countries}
            bg="bg-dark border border-gray text-white"
         />
         <div className="flex flex-col justify-center py-2">
            <Button
               onClick={onSaveFilter}
               color="flex-1 bg-primary hover:bg-secondary"
            >
               Close
            </Button>
         </div>
      </div>
   );
};

export default FilterSearch;
