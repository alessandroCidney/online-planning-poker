import { Request, Response } from 'express'

import { Room } from '../models/Room'

export class RoomController {
  static async createRoom(req: Request<{}, {}, InstanceType<typeof Room>>, res: Response) {  
    try {
      const { users } = req.body
    
      const room = new Room({
        users,
      })

      const savedRoom = await room.save()

      res.status(201).json(savedRoom)
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : 'Internal server error',
      })
    }
  }
}
