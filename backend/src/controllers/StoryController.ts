import { Server, Socket } from 'socket.io'

import { onlineRooms } from './RoomController'

import { Story } from '../models/Story'

import { AppError } from '../helpers/error'

function someVotingIsStarted(roomId: string) {
  const startedVotingExists = Object.values(onlineRooms[roomId].stories)
    .some(storyData => storyData.votingStatus === 'in_progress')

  if (startedVotingExists) {
    throw new AppError({
      message: 'Já existe uma votação!',
      details: 'Finalize a votação atual antes de iniciar próximas votações.',
      status: 400,
    })
  }
}

function allowOnlyOwner(roomId: string, userId: string) {
  const userIsOwner = onlineRooms[roomId].ownerIds.includes(userId)

  if (!userIsOwner) {
    throw new AppError({
      message: 'Sem autorização!',
      details: 'Somente os donos da sala podem realizar esta ação.',
      status: 403,
    })
  }
}

export class StoryController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  createStory(params: { roomId: string, title: string }) {
    allowOnlyOwner(params.roomId, this.socket.id)

    const story = new Story(params.title)

    onlineRooms[params.roomId].stories[story._id] = story

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return story
  }

  removeStory(params: { roomId: string, storyId: string }) {
    allowOnlyOwner(params.roomId, this.socket.id)

    delete onlineRooms[params.roomId].stories[params.storyId]

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])
  }

  startVoting(params: { roomId: string, storyId: string }) {
    allowOnlyOwner(params.roomId, this.socket.id)
    someVotingIsStarted(params.roomId)

    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'in_progress'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-started', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  saveVote(params: { roomId: string, storyId: string, voteValue: number }) {
    onlineRooms[params.roomId].stories[params.storyId].votes[this.socket.id] = params.voteValue

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  concludeVoting(params: { roomId: string, storyId: string }) {
    allowOnlyOwner(params.roomId, this.socket.id)

    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'concluded'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-concluded', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  restartVoting(params: { roomId: string, storyId: string }) {
    allowOnlyOwner(params.roomId, this.socket.id)
    someVotingIsStarted(params.roomId)

    onlineRooms[params.roomId].stories[params.storyId].votes = {}
    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'in_progress'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-restarted', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }
}