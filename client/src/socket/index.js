import io from 'socket.io-client'
export let endPoint = `http://10.0.0.50:9000`
let socket
if (socket) {
   socket.close()
}
socket = io(`http://10.0.0.50:9000`)
export { socket }
