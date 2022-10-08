import React from 'react'

const Button = ({ children, color, onClick }) => {
   return (
      <div
         onClick={onClick}
         className={`text-white flex justify-center items-center gap-2 text-xl rounded-md p-3 ${color} duration-300 cursor-pointer`}
      >
         {children}
      </div>
   )
}

Button.defaultProps = {
   children: 'Button Primary',
   size: 5,
   color: 'primary',
}

export default Button
