import { Server, Socket } from 'socket.io'

import { onlineRooms } from './RoomController'

import { User } from '../models/User'

export class UserController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  updateAvatar(params: { roomId: string, avatar: User['avatar'] }) {
    onlineRooms[params.roomId].users[this.socket.id].avatar = params.avatar

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return onlineRooms[params.roomId].users[this.socket.id]
  }
}