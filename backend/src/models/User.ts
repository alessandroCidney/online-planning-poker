import { v4 as uuidV4 } from 'uuid'

export class User {
  _id: string
  name: string

  avatar: {
    type: 'internal_photo',
    path: string
  }

  constructor(name = 'Sem Nome', _id = uuidV4(), avatar = { type: 'internal_photo' as const, path: 'cat-king' }) {
    this.name = name
    this._id = _id
    this.avatar = avatar
  }
}
