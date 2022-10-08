import React from "react";

const RightBar = ({ children }) => {
   return (
      <div className="relative lg:flex flex-col gap-5 right-bar hidden col-span-4 lg:col-span-4 xl:col-span-3">
         {children}
      </div>
   );
};

export default RightBar;
