import { Socket, Server } from 'socket.io'

import { Room } from '../models/Room'
import { User } from '../models/User'

const onlineRooms: Record<string, Room> = {}

export class RoomController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  async createRoom(socket: Socket) {
    const room = new Room()

    room.ownerIds.push(socket.id)

    onlineRooms[room._id] = room
  }

  async joinRoom(payload: { roomId: string, user: Partial<User> }) {
    const user = new User(payload.user.name, this.socket.id)

    this.socket.join(payload.roomId)

    onlineRooms[payload.roomId].users.push(user)

    this.io.to(payload.roomId).emit('room:updated', onlineRooms[payload.roomId])
  }

  async leaveRoom(payload: { roomId: string }) {
    const onlineUsers = onlineRooms[payload.roomId].users

    const userIndex = onlineUsers.findIndex(userData => userData._id === this.socket.id)
    onlineUsers.splice(userIndex, 1)

    this.io.to(payload.roomId).emit('room:updated', onlineRooms[payload.roomId])

    this.io.to(this.socket.id).emit('room:leave', onlineRooms[payload.roomId])
  }

  async deleteRoom(room: unknown) {
    console.log('room', room)
  }
}
