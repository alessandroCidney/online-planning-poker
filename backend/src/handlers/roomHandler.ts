import { Socket, Server } from 'socket.io'

import { RoomController } from '../controllers/RoomController'

function setupRoomEvents(io: Server, socket: Socket) {
  const roomControler = new RoomController(io, socket)

  socket.on('room:create', roomControler.createRoom)
  socket.on('room:join', roomControler.joinRoom)
  socket.on('room:leave', roomControler.leaveRoom)

  // Socket IO Events
  socket.on('delete-room', roomControler.deleteRoom)
}

export {
  setupRoomEvents,
}