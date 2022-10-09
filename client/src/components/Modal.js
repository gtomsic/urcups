import ReactDOM from 'react-dom'

const Modal = ({ children, onClose }) => {
   return ReactDOM.createPortal(
      <div
         onClick={onClose}
         className='fixed flex flex-col overflow-hidden items-center justify-center z-50 top-0 right-0 left-0 bottom-0 backdrop-blur-3xl backdrop-filter backdrop-opacity-98'
      >
         {children}
      </div>,
      document.querySelector('#portal')
   )
}

export default Modal
