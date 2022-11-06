import io from 'socket.io-client'
import { socketUrl } from '../url'
let socket

socket = (() => {
   if (socket) {
      socket.close()
   }
   return (socket = io(socketUrl))
})()
export { socket }
