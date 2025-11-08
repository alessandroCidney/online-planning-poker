import { v4 as uuidV4 } from 'uuid'

export class Story {
  _id: string
  title: string
  description?: string

  constructor(title: string, description?: string, _id = uuidV4()) {
    this._id = _id
    this.title = title
    this.description = description
  }
}