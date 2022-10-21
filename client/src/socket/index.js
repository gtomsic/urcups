import io from 'socket.io-client'

export const socket = io(`http://10.0.0.50:9000`)

export const nsSocket = (endPoint) => io(`http://10.0.0.50:9000${endPoint}`)
