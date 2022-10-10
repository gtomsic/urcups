import React from 'react'
import { FaTrash, FaCheck } from 'react-icons/fa'

class ImageItem extends React.Component {
   constructor(props) {
      super(props)
      this.state = { spans: 0, delete: false }
      this.imageRef = React.createRef()
   }
   componentDidMount() {
      this.imageRef.current.addEventListener('load', this.setSpans)
   }
   setSpans = () => {
      const height = this.imageRef.current.clientHeight
      const spans = Math.ceil(height / 10)

      this.setState({ spans })
   }
   onSelectDeleteHandler = (e, file) => {
      e.stopPropagation()
      this.setState({ delete: !this.state.delete })
      this.props.onDelete(file)
   }
   render() {
      const { image, fileName, select } = this.props
      return (
         <div
            onClick={this.props.onClick}
            style={{
               gridRowEnd: `span ${this.state.spans}`,
               backgroundImage: `url(${image})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
            }}
            className='group relative overflow-hidden'
         >
            {select ? (
               <div
                  onClick={(e) => this.onSelectDeleteHandler(e, fileName)}
                  className={`cursor-pointer p-3 m-2 bg-white bg-opacity-30 rounded-md inline-block ${
                     this.state.delete ? 'bg-opacity-100' : null
                  }`}
               >
                  {!this.state.delete ? (
                     <span className='text-danger'>
                        <FaTrash />
                     </span>
                  ) : (
                     <span className='text-secondary'>
                        <FaCheck />
                     </span>
                  )}
               </div>
            ) : null}
            <div className='absolute z-20 bottom-0 h-[70%] w-full bg-gradient-to-t from-dark group-hover:from-warning group-hover:duration-500 cursor-pointer'></div>
            <img
               ref={this.imageRef}
               src={image}
               alt={fileName}
               className='group-hover:cursor-pointer shadow-2xl group-hover:shadow-secondary group-hover:duration-500 opacity-0'
            />
         </div>
      )
   }
}

export default ImageItem
