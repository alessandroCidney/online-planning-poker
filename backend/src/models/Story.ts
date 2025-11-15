import { v4 as uuidV4 } from 'uuid'

export class Story {
  _id: string
  title: string

  votingStatus: 'not_started' | 'in_progress' | 'concluded'
  votes: Record<string, number>

  constructor(title: string, _id = uuidV4()) {
    this._id = _id
    this.title = title

    this.votingStatus = 'not_started'
    this.votes = {}
  }
}