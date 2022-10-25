import io from 'socket.io-client'

export let nsSocket = io('http://10.0.0.50:9000')

export let nsConnection = (endPoint) => io(`http://10.0.0.50:9000${endPoint}`)

export const socketJoinLeave = (data) => {
   nsSocket.emit('joinLeave', data)
}
