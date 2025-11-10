import { Socket, Server } from 'socket.io'

import { RoomController, onlineRooms } from '../controllers/RoomController'

import { User } from '../models/User'
import { Room } from '../models/Room'

type SocketCallback<T> = (param: T) => void

let loadedGeneralEvents = false

function setupRoomGeneralEvents(roomController: RoomController, io: Server) {
  if (!loadedGeneralEvents) {
    loadedGeneralEvents = true

    io.of('/').adapter.on('delete-room', (roomId) => {
      if (onlineRooms[roomId]) {
        roomController.deleteRoom(roomId)
      }
    })
  }
}

function setupRoomIndividualEvents(roomController: RoomController, socket: Socket) {
  socket.on('room:create', (callback: SocketCallback<Room>) => {
    const newRoom = roomController.createRoom()

    callback(newRoom)
  })

  socket.on('room:join', (roomId: string, userData: Partial<User>, callback: SocketCallback<Room>) => {
    const joinedRoom = roomController.joinRoom(roomId, userData)

    callback(joinedRoom)
  })

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (onlineRooms[roomId]) {
        roomController.leaveRoom(roomId)
      }
    }
  })
}

function setupRoomEvents(io: Server, socket: Socket) {
  const roomController = new RoomController(io, socket)

  setupRoomIndividualEvents(roomController, socket)
  setupRoomGeneralEvents(roomController, io)
}

export {
  setupRoomEvents,
}