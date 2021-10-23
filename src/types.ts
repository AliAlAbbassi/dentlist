import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { Redis } from 'ioredis'

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { hr_assignee_Id?: number }
  }
  redis: Redis
  res: Response
}

export enum condition {
  New,
  Used,
}