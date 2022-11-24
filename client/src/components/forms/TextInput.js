import React from 'react';

const date = new Date().toLocaleDateString();
const min =
   date.split('/')[2] -
   100 +
   '-' +
   date.split('/')[0] +
   '-' +
   (date.split('/')[1] <= 9 ? `0${date.split('/')[1]}` : date.split('/')[1]);
const max =
   date.split('/')[2] +
   '-' +
   date.split('/')[0] +
   '-' +
   (date.split('/')[1] <= 9 ? `0${date.split('/')[1]}` : date.split('/')[1]);

const TextInput = ({
   value,
   onChange,
   label,
   title,
   name,
   type,
   bg,
   required,
   disabled,
}) => {
   return (
      <div className='flex flex-col gap-2 text-lg my-2'>
         {label ? (
            <label htmlFor='input' className='px-2 text-light'>
               {label}
            </label>
         ) : null}
         <div
            className={
               bg
                  ? `rounded-md overflow-hidden ${bg}`
                  : 'rounded-md overflow-hidden bg-white'
            }
         >
            <input
               value={value}
               onChange={onChange}
               name={name}
               id={name}
               type={type}
               placeholder={title}
               className='w-full px-2 py-[10px] block'
               required={required}
               min={min}
               max={max}
               disabled={disabled}
            />
         </div>
      </div>
   );
};

TextInput.defaultProps = {
   required: false,
   label: '',
   type: 'text',
   title: 'placeholder',
   disabled: false,
   color: 'text-dark',
};

export default TextInput;
