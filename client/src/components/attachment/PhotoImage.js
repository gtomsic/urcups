import React, { useEffect, useRef, useState } from 'react';

const PhotoImage = ({ image, item, onClick }) => {
   let [spans, setSpans] = useState(0);
   const photoRef = useRef();
   const process = useRef(false);
   useEffect(() => {
      if (process.current === false) {
         photoRef.current.addEventListener('load', setSpansHandler);
      }
      return () => {
         process.current = true;
      };
   }, []);
   const setSpansHandler = () => {
      const height = photoRef.current.clientHeight;
      const spans = Math.ceil(height / 10);
      setSpans(spans);
   };
   return (
      <div
         onClick={onClick}
         style={{
            gridRowEnd: `span ${spans}`,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
         }}
         className='group relative overflow-hidden'
      >
         <img
            ref={photoRef}
            src={image}
            alt={item?.fileName}
            className='z-0 group-hover:cursor-pointer shadow-2xl group-hover:shadow-secondary group-hover:duration-500 opacity-0'
         />
      </div>
   );
};

export default PhotoImage;
