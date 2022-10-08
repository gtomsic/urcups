import React from "react";

const SearchInput = () => {
   return (
      <div className="bg-light w-full max-w-[70%] lg:max-w-[50%] py-1 px-4 mx-auto rounded-full">
         <input
            type="search"
            name="search"
            id="search"
            placeholder="Search users..."
            className="py-1 bg-light text-dark w-full outline-none border-none"
         />
      </div>
   );
};

export default SearchInput;
