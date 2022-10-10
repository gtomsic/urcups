import React from 'react'

class ImageItem extends React.Component {
   constructor(props) {
      super(props)
      this.state = { spans: 0 }
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
   render() {
      const { image, fileName } = this.props
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
