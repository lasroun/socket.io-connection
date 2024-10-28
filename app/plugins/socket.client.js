import { io } from 'socket.io-client'

const URL = process.env.API || 'http://localhost:8000'

export default defineNuxtPlugin((nuxtApp) => {

  const socket = io(URL)

  socket.on('connect', () => {
    console.log(socket.id + ' connected') 
  })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected')
  })

  nuxtApp.provide('socket', socket)
})
