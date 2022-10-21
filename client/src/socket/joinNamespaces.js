import io from 'socket.io-client'

let nsSocket

let pathConnection = (endPoint) => io(`http://10.0.0.50:9000${endPoint}`)

export const joinNamespace = (data) => {
   nsSocket = pathConnection(data.id)
   nsSocket.emit('onJoined', data)
}
