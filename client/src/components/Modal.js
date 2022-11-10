import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
   const onCloseHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
   };
   return ReactDOM.createPortal(
      <div
         onClick={onCloseHandler}
         className='fixed flex flex-col overflow-hidden items-center justify-center z-50 top-0 right-0 left-0 bottom-0 backdrop-blur-3xl backdrop-filter backdrop-opacity-98'
      >
         {children}
      </div>,
      document.querySelector('#portal')
   );
};

export default Modal;
