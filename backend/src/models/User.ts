import { v4 as uuidV4 } from 'uuid'

export class User {
  _id: string
  name: string

  constructor(name = 'Sem Nome', _id = uuidV4()) {
    this.name = name
    this._id = _id
  }
}
