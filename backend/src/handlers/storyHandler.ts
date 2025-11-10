import { Socket, Server } from 'socket.io'

import { StoryController } from '../controllers/StoryController'

import { Story } from '../models/Story'

import { SocketCallback } from '../types/socket'

function setupStoryEvents(io: Server, socket: Socket) {
  const storyController = new StoryController(io, socket)

  socket.on('story:create', (roomId: string, title: string, description: string, callback: SocketCallback<Story>) => {
    const newStory = storyController.createStory(roomId, title, description)

    callback(newStory)
  })

  socket.on('story:remove', (roomId: string, storyId: string, callback: SocketCallback) => {
    storyController.removeStory(roomId, storyId)

    callback()
  })

  socket.on('story:start-voting', (roomId: string, storyId: string, callback: SocketCallback<Story>) => {
    const updatedStory = storyController.startVoting(roomId, storyId)

    callback(updatedStory)
  })

  socket.on('story:save-vote', (roomId: string, storyId: string, voteValue: number, callback: SocketCallback<Story>) => {
    const updatedStory = storyController.saveVote(roomId, storyId, voteValue)

    callback(updatedStory)
  })

  socket.on('story:conclude-voting', (roomId: string, storyId: string, callback: SocketCallback<Story>) => {
    const updatedStory = storyController.concludeVoting(roomId, storyId)

    callback(updatedStory)
  })
}

export {
  setupStoryEvents,
}