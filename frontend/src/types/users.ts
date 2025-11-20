export interface User {
  _id: string
  name: string

  avatar: {
    type: 'internal_photo',
    path: string
  }
}